import { Repository } from "./repository.js";
import { PlanModel } from "../schemas/plan.schema.js";

export class PlanRepository extends Repository {
    constructor() {
        super(PlanModel);
    }

    async findByNombre(nombre) {
        const documento = await this.mongooseModel.findOne({
            nombre: { $regex: nombre, $options: "i" }
        });
        if (!documento) return null;
        return documento;
    }
}