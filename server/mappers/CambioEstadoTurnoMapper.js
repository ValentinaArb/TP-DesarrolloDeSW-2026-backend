import { CambioEstadoTurno } from "../domain/cambioEstadoTurno";

export class CambioEstadoTurnoMapper {
    static toPersistence(cambioEstadoTurno) {
        return {
            id: cambioEstadoTurno.id,
            fechaInicioIngreso: cambioEstadoTurno.fechaInicioIngreso,
            estado: cambioEstadoTurno.estado,
            turnoId: cambioEstadoTurno.turnoId,
            Paciente: {
                pacienteId: cambioEstadoTurno.paciente.id,
                nombre: cambioEstadoTurno.paciente.nombre,
                apellido: cambioEstadoTurno.paciente.apellido
            },
            motivo: cambioEstadoTurno.motivo
        };
    }

    static toDomain(cambioEstadoTurnoDoc) {
        const paciente = {
            id: cambioEstadoTurnoDoc.Paciente.pacienteId,
            nombre: cambioEstadoTurnoDoc.Paciente.nombre,
            apellido: cambioEstadoTurnoDoc.Paciente.apellido
        };
        return new CambioEstadoTurno(cambioEstadoTurnoDoc.id, cambioEstadoTurnoDoc.fechaInicioIngreso, cambioEstadoTurnoDoc.estado, cambioEstadoTurnoDoc.turnoId, paciente, cambioEstadoTurnoDoc.motivo);
    }
}