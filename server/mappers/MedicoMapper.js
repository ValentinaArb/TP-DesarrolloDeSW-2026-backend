import { Medico } from "../domain/medico.js";

export class MedicoMapper {
    static toPersistence(medico) {
        return {
            id: medico.id,
            nombre: medico.nombre,
            apellido: medico.apellido,
            email: medico.email,
            matricula: medico.matricula,
            especialidades: medico.especialidades.map((especialidad) => ({
                especialidadId: especialidad.especialidadId,
                nombre: especialidad.nombre
            })),
            practicas: medico.practicas.map((practica) => ({
                practicaId: practica.id,
                nombre: practica.nombre
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
        const especialidades = medicoDoc.especialidades.map((especialidad) => ({
            especialidadId: especialidad.especialidadId,
            nombre: especialidad.nombre
        }));
        const practicas = medicoDoc.practicas.map((practica) => ({
            practicaId: practica.id,
            nombre: practica.nombre
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
        return new Medico(medicoDoc.id, medicoDoc.nombre, medicoDoc.apellido, medicoDoc.email, medicoDoc.matricula, especialidades, practicas, sedes, disponibilidades);
    }
}