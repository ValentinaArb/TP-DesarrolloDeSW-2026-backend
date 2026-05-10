import { Repository } from "./repository.js";
import { MedicoModel } from "../schemas/medico.schema.js";
import { MedicoMapper } from "../mappers/MedicoMapper.js";

export class MedicoRepository extends Repository {
    constructor() {
        super(MedicoModel, MedicoMapper);
    }

    async findByMatricula(matricula) {
        const documento = await this.mongooseModel.findOne({ matricula: matricula });
        return this.mapper.toDomain(documento);
    }
}
