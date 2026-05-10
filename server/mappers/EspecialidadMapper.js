import { Especialidad } from "../domain/especialidad.js";

export class EspecialidadMapper {
    static toPersistence(especialidad) {
        return {
            nombre: especialidad.nombre,
            duracion: especialidad.duracion,
            costo: especialidad.costo
        };
    }

    static toDomain(especialidadDoc) {
        return new Especialidad(especialidadDoc._id.toString(), especialidadDoc.nombre, especialidadDoc.duracion, especialidadDoc.costo);
    }
}