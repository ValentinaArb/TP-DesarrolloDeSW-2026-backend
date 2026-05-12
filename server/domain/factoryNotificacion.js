import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { Notificacion } from "./notificacion.js";

export class FactoryNotificacion {

    constructor() {
        this.notificacionRepository = new NotificacionRepository()
    }

    async crearSegunEstadoTurno(turno) {
        let mensaje = "";
        let destinatario;
        let remitente;
        switch (turno.estado) {
            case 'REALIZADO':
                mensaje = `Tu turno para el ${turno.fechaInicio} fue realizado.`;
                destinatario = turno.paciente;
                remitente = turno.medico;
                break;
            case 'CANCELADO':
                mensaje = `El turno del día ${turno.fechaInicio} fue cancelado.`;
                destinatario = turno.paciente;
                remitente = turno.medico;
                break;
            case 'DISPONIBLE':
                mensaje = `El turno del ${turno.fechaInicio} fue cancelado.`;
                destinatario = turno.medico;
                remitente = turno.paciente;
                break;
            case 'RESERVADO':
                mensaje = `El turno del ${turno.fechaInicio} fue reservado por el paciente ${turno.paciente.nombre} para el servicio ${turno.servicio.nombre}.`;
                destinatario = turno.medico;
                remitente = turno.paciente;
                break;
            case 'PENDIENTE':
                mensaje = `El turno del ${turno.fechaInicio} fue modificado por el médico ${turno.medico.nombre}. Por favor, revisa los detalles del turno y acepta o rechaza.`;
                destinatario = turno.paciente;
                remitente = turno.medico;
            default:
                throw new Error("Estado de turno no reconocido para notificar");
        }
        const notificacion = new Notificacion(null, destinatario, remitente, mensaje, null, null, null);
        await this.notificacionRepository.create(notificacion);
        return notificacion
    }
    async crearRecordatorio(turno) {
        const mensaje = `Te recordamos el turno de mañana ${turno.fechaInicio} a las ${turno.fechaInicio.getHours()}.`;

        const destinatario = [turno.paciente, turno.medico];

        const notificacion = new Notificacion(null, destinatario, null, mensaje, new Date(), null, false);
        await this.notificacionRepository.create(notificacion)
        return notificacion
    }    
}