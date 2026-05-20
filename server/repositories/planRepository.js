import { Repository } from "./repository.js";
import { PlanMapper } from "../mappers/PlanMapper.js";
import { PlanModel } from "../schemas/plan.schema.js";

export class PlanRepository extends Repository {
    constructor() {
        super(PlanModel, PlanMapper);
    }

    async findByNombre(nombre) {
        const documento = await this.mongooseModel.findOne({ nombre: nombre });
        if (!documento) return this.errorNoEncontrado();
        return this.mapper.toDomain(documento);
    }
}