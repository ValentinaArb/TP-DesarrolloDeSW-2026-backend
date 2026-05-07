import { Repository } from "./repository";
import { PlanMapper } from "../mappers/PlanMapper";
import { PlanModel } from "../schemas/plan.schema.js";

export class PlanRepository extends Repository {
    constructor() {
        super(PlanModel, new PlanMapper());
    }
}