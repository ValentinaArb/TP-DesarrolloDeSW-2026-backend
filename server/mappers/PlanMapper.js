import { CoberturaMapper } from "./CoberturaMapper.js";
import { Plan } from "../domain/plan.js";

export class PlanMapper {
    static toPersistence(plan) {
        return {
            id: plan.id,
            nombre: plan.nombre,
            coberturas: plan.coberturas.map(cobertura => CoberturaMapper.toPersistence(cobertura))
        };
    }
    static toDomain(planDoc) {
        return new Plan(planDoc.id, planDoc.nombre, planDoc.coberturas.map(cobertura => CoberturaMapper.toDomain(cobertura)));
    }
}