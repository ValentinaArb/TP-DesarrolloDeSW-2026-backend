import { DisponibilidadHoraria } from "../domain/disponibilidadHoraria.js";

export class DisponibilidadMapper {
    static toPersistence(disponibilidad) {
        return {
            diaSemana: disponibilidad.diaSemana,
            horaDesde: disponibilidad.horaDesde.toString(),
            horaHasta: disponibilidad.horaHasta.toString()
        };
    }

    static toDomain(disponibilidadDoc) {
        return new DisponibilidadHoraria(disponibilidadDoc._id.toString(), disponibilidadDoc.diaSemana, disponibilidadDoc.horaDesde, disponibilidadDoc.horaHasta);
    }
}