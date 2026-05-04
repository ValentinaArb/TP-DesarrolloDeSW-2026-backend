import { NotFoundError } from "../errors/AppError.js";

export class Repository {
    constructor(mongooseModel, mapper) {
        this.mongooseModel = mongooseModel;
        this.mapper = mapper;
    }
    
    // CREATE (POST)
    async create(objeto) {
        // 1. Traduce de Dominio a formato BD
        const dataMongo = this.mapper.toPersistence(objeto);
        
        // 2. Guarda en MongoDB
        const documentoGuardado = await this.mongooseModel.create(dataMongo);
        
        // 3. Devuelve la entidad de dominio con su nuevo ID
        return this.mapper.toDomain(documentoGuardado);
    }

    // DELETE (DELETE)
    async delete(objetoId) {
        await this.mongooseModel.findByIdAndDelete(objetoId);
    }

    // READ (GET)
    // all
    async findAll() {
        const documentos = await this.mongooseModel.find();

        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    async findPaginated(pagina, limitePorPagina) {
        // 1. Calculamos desde dónde empezar a cortar (el "inicio")
        const skip = (pagina - 1) * limitePorPagina;

        // 2. Ejecutamos las dos consultas a la vez para que sea más rápido
        // Usamos Promise.all porque contar y buscar son tareas independientes
        const [totalObjetos, documentos] = await Promise.all([
            this.mongooseModel.countDocuments(), // Cuenta el total exacto en la BD
            this.mongooseModel.find()            // Busca los documentos
                .skip(skip)              // "Sáltate los primeros N"
                .limit(limitePorPagina)  // "Y de los que quedan, tráeme solo esta cantidad"
        ]);

        // 3. Traducimos los documentos de Mongoose a tus objetos de Dominio
        const objetosDeDominio = documentos.map(doc => this.mapper.toDomain(doc));

        // 4. Devolvemos exactamente la misma estructura que tu Service ya espera
        return {
            objetos: objetosDeDominio,
            totalObjetos: totalObjetos
        };
    }

    // by ID
    async findById(objetoId) {
        const documento = await this.mongooseModel.findById(objetoId);
        if (!documento) return this.errorNoEncontrado();
        
        return this.mapper.toDomain(documento);
    }

    // UPDATE (PUT/PATCH)
    async update(nuevoObjeto, idObjetoViejo) {
        const dataMongo = this.mapper.toPersistence(nuevoObjeto);
    
        // findByIdAndUpdate busca por ID y reemplaza los datos.
        // El { new: true } es VITAL: le dice a Mongoose que te devuelva 
        // el objeto YA actualizado (por defecto devuelve la versión vieja).
        const documentoActualizado = await this.mongooseModel.findByIdAndUpdate(
            idObjetoViejo, 
            dataMongo, 
            { new: true } 
        );
        
        if (!documentoActualizado) return this.errorNoEncontrado();
        
        return this.mapper.toDomain(documentoActualizado);
    }

    errorNoEncontrado() {
        throw new NotFoundError("Whoops! El id buscado no existe");
    }
}