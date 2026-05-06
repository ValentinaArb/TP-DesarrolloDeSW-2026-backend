import { Medico } from "../domain/medico.js";

export class MedicoMapper {
    static toPersistence(medico) {
        return {
            id: medico.id,
            nombre: medico.nombre,
            apellido: medico.apellido,
            email: medico.email,
            matricula: medico.matricula,
            servicios: medico.servicios.map((servicio) => ({
                servicioId: servicio.id,
                nombre: servicio.nombre
            })),
            sedes: medico.sedes.map((sede) => ({
                sedeId: sede.id,
                nombre: sede.nombre
            })),
            disponibilidades: medico.disponibilidades.map((disponibilidad) => ({
                diaSemana: disponibilidad.diaSemana,
                fechaInicio: disponibilidad.horaDesde,
                fechaFinal: disponibilidad.horaHasta
            }))
        };
    }

    static toDomain(medicoDoc) {
        const servicios = medicoDoc.servicios.map((servicio) => ({
            servicioId: servicio.id,
            nombre: servicio.nombre
        }));
        const sedes = medicoDoc.sedes.map((sede) => ({
            sedeId: sede.id,
            nombre: sede.nombre
        }));
        const disponibilidades = medicoDoc.disponibilidades.map((disponibilidad) => ({
            diaSemana: disponibilidad.diaSemana,
            fechaInicio: disponibilidad.horaDesde,
            fechaFinal: disponibilidad.horaHasta
        }));
        return new Medico(medicoDoc.id, medicoDoc.nombre, medicoDoc.apellido, medicoDoc.email, medicoDoc.matricula, servicios, sedes, disponibilidades);
    }
}