import { Servicio } from "../domain/servicio.js";

export class ServicioMapper {
    static toPersistence(servicio) {
        return {
            nombre: servicio.nombre,
            duracionTurno: servicio.duracionTurno,
            costo: servicio.costo
        };
    }

    static toDomain(servicioDoc) {
        return new Servicio(servicioDoc._id.toString(), servicioDoc.nombre, servicioDoc.duracionTurno, servicioDoc.costo);
    }
}