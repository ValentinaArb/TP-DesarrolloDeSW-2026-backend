import { Repository } from "./repository.js";
import { MedicoModel } from "../schemas/medico.schema.js";

export class MedicoRepository extends Repository {
    constructor() {
        super(MedicoModel);
    }

    async findByMatricula(matricula) {
        return await this.mongooseModel.findOne({ matricula: matricula });
    }
}
