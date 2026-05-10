import { CoberturaMapper } from "./CoberturaMapper.js";
import { Plan } from "../domain/plan.js";

export class PlanMapper {
    static toPersistence(plan) {
        return {
            nombre: plan.nombre,
            coberturas: plan.coberturasServicio.map(cobertura => CoberturaMapper.toPersistence(cobertura))
        };
    }
    static toDomain(planDoc) {
        return new Plan(planDoc._id.toString(), planDoc.nombre, planDoc.coberturas.map(cobertura => CoberturaMapper.toDomain(cobertura)));
    }
}