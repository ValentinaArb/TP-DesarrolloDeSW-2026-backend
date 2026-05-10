import { Servicio } from "../domain/servicio.js";

export class ServicioMapper {
    static toPersistence(servicio) {
        return {
            nombre: servicio.nombre,
            duracion: servicio.duracion,
            costo: servicio.costo
        };
    }

    static toDomain(servicioDoc) {
        return new Servicio(servicioDoc._id.toString(), servicioDoc.nombre, servicioDoc.duracion, servicioDoc.costo);
    }
}