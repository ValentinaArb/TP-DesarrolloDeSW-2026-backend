import { Turno } from "../domain/turno.js";

export class TurnoMapper {
    static toPersistence(turno) {
        // Compensar offset de zona horaria al guardar
        const offset = turno.fechaInicio.getTimezoneOffset() * 60000;
        const fechaInicioAjustada = new Date(turno.fechaInicio.getTime() - offset);
        const fechaFinalAjustada = new Date(turno.fechaFinal.getTime() - offset);
        
        return {
            medicoInfo: {
                id: turno.medico.id,
                nombre: turno.medico.nombre,
                apellido: turno.medico.apellido
            },
            fechaInicio: fechaInicioAjustada,
            fechaFinal: fechaFinalAjustada,
            pacienteInfo: turno.paciente ? {
                id: turno.paciente.id,
                nombre: turno.paciente.nombre,
                apellido: turno.paciente.apellido
            } : null,
            servicioInfo: {
                id: turno.servicio.id,
                nombre: turno.servicio.nombre,
                duracionTurno: turno.servicio.duracionTurno,
                costo: turno.servicio.costo,
                codigo: turno.servicio.codigo
            },
            sedeInfo: {
                nombre: turno.sede.nombre,
                direccion: turno.sede.direccion
            },
            estado: turno.estado,
            historialDeEstados: turno.historialDeEstados.map((estado) => ({
                fechaInicioIngreso: estado.fechaInicioIngreso,
                estado: estado.estado,
                motivo: estado.motivo
            })),
            costo: turno.costo
        };
    }

    static toDomain(turnoDoc) {
        const medico = {
            id: turnoDoc.medicoInfo.id,
            nombre: turnoDoc.medicoInfo.nombre,
            apellido: turnoDoc.medicoInfo.apellido
        };
        const paciente = turnoDoc.pacienteInfo ? {
            id: turnoDoc.pacienteInfo.id,
            nombre: turnoDoc.pacienteInfo.nombre,
            apellido: turnoDoc.pacienteInfo.apellido
        } : null;
        const servicio = { nombre: turnoDoc.servicioInfo.nombre, duracionTurno: turnoDoc.servicioInfo.duracionTurno };
        const sede = { nombre: turnoDoc.sedeInfo.nombre, direccion: turnoDoc.sedeInfo.direccion };
        return new Turno(turnoDoc._id.toString(), medico, turnoDoc.fechaInicio, turnoDoc.fechaFinal, paciente, servicio, sede, turnoDoc.estado, turnoDoc.historialDeEstados, turnoDoc.costo);
    }
}