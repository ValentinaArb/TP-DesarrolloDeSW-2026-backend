export class EspecialidadMapper {
    static toPersistence(especialidad) {
        return {
            id: especialidad.id,
            nombre: especialidad.nombre,
            duracionTurno: especialidad.duracionTurno,
            costo: especialidad.costo
        };
    }

    static toDomain(especialidadDoc) {
        return new Especialidad(especialidadDoc.id, especialidadDoc.nombre, especialidadDoc.duracionTurno, especialidadDoc.costo);
    }
}