import { CambioEstadoTurno } from "../domain/cambioEstadoTurno.js";

export class CambioEstadoTurnoMapper {
    static toPersistence(cambioEstadoTurno) {
        return {
            fechaInicioIngreso: cambioEstadoTurno.fechaInicioIngreso,
            estado: cambioEstadoTurno.estado,
            turno: cambioEstadoTurno.turno,
            Paciente: {
                id: cambioEstadoTurno.paciente.id,
                nombre: cambioEstadoTurno.paciente.nombre,
                apellido: cambioEstadoTurno.paciente.apellido
            },
            motivo: cambioEstadoTurno.motivo
        };
    }

    static toDomain(cambioEstadoTurnoDoc) {
        const paciente = {
            id: cambioEstadoTurnoDoc.Paciente.id,
            nombre: cambioEstadoTurnoDoc.Paciente.nombre,
            apellido: cambioEstadoTurnoDoc.Paciente.apellido
        };
        return new CambioEstadoTurno(cambioEstadoTurnoDoc._id.toString(), cambioEstadoTurnoDoc.fechaInicioIngreso, cambioEstadoTurnoDoc.estado, cambioEstadoTurnoDoc.turno, paciente, cambioEstadoTurnoDoc.motivo);
    }
}