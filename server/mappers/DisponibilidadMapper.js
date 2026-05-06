export class DisponibilidadMapper {
    static toPersistence(disponibilidad) {
        return {
            id: disponibilidad.id,
            diaSemana: disponibilidad.diaSemana,
            horaDesde: `${disponibilidad.horaDesde.getHours()}:${disponibilidad.horaDesde.getMinutes()}`,
            horaHasta: `${disponibilidad.horaHasta.getHours()}:${disponibilidad.horaHasta.getMinutes()}`
        };
    }

    static toDomain(disponibilidadDoc) {
        return new DisponibilidadHoraria(disponibilidadDoc.id, disponibilidadDoc.diaSemana, disponibilidadDoc.horaDesde, disponibilidadDoc.horaHasta);
    }
}