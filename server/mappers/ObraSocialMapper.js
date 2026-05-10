import { ObraSocial } from "../domain/obraSocial.js";
import { PlanMapper } from "./PlanMapper.js";

export class ObraSocialMapper {
    static toPersistence(obraSocial) {
        return {
            nombre: obraSocial.nombre,
            planes: obraSocial.planes.map(plan => PlanMapper.toPersistence(plan))
        };
    }

    static toDomain(obraSocialDoc) {
        return new ObraSocial(obraSocialDoc._id.toString(), obraSocialDoc.nombre, obraSocialDoc.planes.map(plan => PlanMapper.toDomain(plan)));
    }
}