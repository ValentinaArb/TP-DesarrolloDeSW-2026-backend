import {NotFoundError} from "../errors/AppError.js";

export class Repository {
    constructor(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }
    
    // CREATE (POST)
    async create(objeto) {
        return await this.mongooseModel.create(objeto);
    }

    // DELETE (DELETE)
    async delete(objetoId) {
        const document = await this.mongooseModel.findByIdAndDelete(objetoId);
        if (!document) {
            this.errorNoEncontrado();
        }
    }

    // READ (GET)
    // all
    async findAll() {
        return await this.mongooseModel.find();
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
        if (!documento) this.errorNoEncontrado();
        return documento;
    }

    // UPDATE (PUT/PATCH)
    async update(nuevoObjeto, idObjetoViejo) {
        const documentoActualizado = await this.mongooseModel.findByIdAndUpdate(
            idObjetoViejo, 
            nuevoObjeto,
            { returnDocument: "after", runValidators: true }
        );
        
        if (!documentoActualizado) return this.errorNoEncontrado();
        return documentoActualizado;
    }

    errorNoEncontrado() {
        throw new NotFoundError("Whoops! El id buscado no existe");
    }
}