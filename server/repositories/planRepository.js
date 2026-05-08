import { Repository } from "./repository.js";
import { PlanMapper } from "../mappers/PlanMapper.js";
import { PlanModel } from "../schemas/plan.schema.js";

export class PlanRepository extends Repository {
    constructor() {
        super(PlanModel, PlanMapper);
    }
}