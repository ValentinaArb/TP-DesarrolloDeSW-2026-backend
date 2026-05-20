import { DisponibilidadHoraria } from '../domain/DisponibilidadHoraria.js';

export class DisponibilidadMapper {
    static toPersistence(disponibilidad) {
        return {
            diaSemana: disponibilidad.diaSemana,
            horaDesde: disponibilidad.horaDesde,
            horaHasta: disponibilidad.horaHasta
        };
    }

    static toDomain(disponibilidadDoc) {
        return new DisponibilidadHoraria(disponibilidadDoc._id.toString(), disponibilidadDoc.diaSemana, disponibilidadDoc.horaDesde, disponibilidadDoc.horaHasta);
    }
}