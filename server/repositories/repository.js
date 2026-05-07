import { NotFoundError } from "../errors/AppError.js";

export class Repository {
    constructor(mongooseModel, mapper) {
        this.mongooseModel = mongooseModel;
        this.mapper = mapper;
    }
    
    // CREATE (POST)
    async create(objeto) {
        const dataMongo = this.mapper.toPersistence(objeto);
        const documentoGuardado = await this.mongooseModel.create(dataMongo);
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
        const skip = (pagina - 1) * limitePorPagina;
        const [totalObjetos, documentos] = await Promise.all([
            this.mongooseModel.countDocuments(),
            this.mongooseModel.find()
                .skip(skip)
                .limit(limitePorPagina)
        ]);
        const objetosDeDominio = documentos.map(doc => this.mapper.toDomain(doc));
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