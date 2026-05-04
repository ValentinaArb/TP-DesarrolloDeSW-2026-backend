import { Turno } from "../domain/turno.js";
import { Medico } from "../domain/medico.js";
import { Paciente } from "../domain/paciente.js";

export class TurnoMapper {
    static toPersistence(turno) {
        return {
            medicoInfo: {
                medicoId: turno.medico.id,
                nombre: turno.medico.nombre,
                apellido: turno.medico.apellido
            },
            fechaInicio: turno.fechaInicio,
            fechaFinal: turno.fechaFinal,
            pacienteInfo: turno.paciente ? {
                pacienteId: turno.paciente.id,
                nombre: turno.paciente.nombre,
                apellido: turno.paciente.apellido
            } : null,
            servicioInfo: {
                nombre: turno.servicio.nombre,
                duracion: turno.servicio.duracion
            },
            sedeInfo: {
                nombre: turno.sede.nombre,
                direccion: turno.sede.direccion
            },
            estado: turno.estado,
            historialDeEstados: turno.historialDeEstados.map((estado) => ({
                fecha: estado.fecha,
                nuevoEstado: estado.nuevoEstado,
                motivo: estado.motivo
            })),
            costo: turno.costo
        };
    }

    static toDomain(turnoDoc) {
        const medico = new Medico(turnoDoc.medicoInfo.medicoId, turnoDoc.medicoInfo.nombre, turnoDoc.medicoInfo.apellido);
        const paciente = turnoDoc.pacienteInfo ? new Paciente(turnoDoc.pacienteInfo.pacienteId, turnoDoc.pacienteInfo.nombre, turnoDoc.pacienteInfo.apellido) : null;
        const servicio = { nombre: turnoDoc.servicioInfo.nombre, duracion: turnoDoc.servicioInfo.duracion };
        const sede = { nombre: turnoDoc.sedeInfo.nombre, direccion: turnoDoc.sedeInfo.direccion };
        return new Turno(turnoDoc._id, medico, turnoDoc.fechaInicio, turnoDoc.fechaFinal, paciente, servicio, sede, turnoDoc.estado, turnoDoc.historialDeEstados, turnoDoc.costo);
    }
}