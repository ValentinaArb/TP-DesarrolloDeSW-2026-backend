import { Medico } from "../domain/medico.js";

export class MedicoMapper {
    static toPersistence(medico) {
        return {
            nombre: medico.nombre,
            apellido: medico.apellido,
            usuario: medico.usuario,
            matricula: medico.matricula,
            servicios: medico.servicios.map((servicio) => ({
                nombre: servicio.nombre
            })),
            sedes: medico.sedes.map((sede) => ({
                nombre: sede.nombre
            })),
            disponibilidades: medico.disponibilidades.map((disponibilidad) => ({
                diaSemana: disponibilidad.diaSemana,
                horaDesde: disponibilidad.horaDesde,
                horaHasta: disponibilidad.horaHasta
            }))
        };
    }

    static toDomain(medicoDoc) {
        const servicios = medicoDoc.servicios.map((servicio) => ({
            id: servicio._id.toString(),
            nombre: servicio.nombre
        }));
        const sedes = medicoDoc.sedes.map((sede) => ({
            id: sede._id.toString(),
            nombre: sede.nombre
        }));
        const disponibilidades = medicoDoc.disponibilidades.map((disponibilidad) => ({
            diaSemana: disponibilidad.diaSemana,
            fechaInicio: disponibilidad.horaDesde,
            fechaFinal: disponibilidad.horaHasta
        }));
        return new Medico(medicoDoc._id.toString(), medicoDoc.usuario, medicoDoc.matricula, medicoDoc.nombre, medicoDoc.apellido,  servicios, sedes, disponibilidades);
    }
}