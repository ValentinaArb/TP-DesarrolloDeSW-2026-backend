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
        console.log(turno)
        switch (turno.estado) {
            case 'REALIZADO':
                mensaje = `Tu turno para el ${turno.fecha} fue realizado.`;
                destinatario = turno.paciente;
                remitente = turno.medico;
                break;
            case 'CANCELADO':
                mensaje = `El turno del día ${turno.fecha} fue cancelado.`;
                destinatario = turno.paciente;
                remitente = turno.medico;
                break;
            case 'DISPONIBLE':
                mensaje = `El turno del ${turno.fecha} fue cancelado.`;
                destinatario = turno.medico;
                remitente = turno.paciente;
                break;
            case 'RESERVADO':
                mensaje = `El turno del ${turno.fecha} fue reservado. 
                Paciente: ${turno.paciente}
                Servicio: ${turno.servicio}`;
                destinatario = turno.medico;
                remitente = turno.paciente;
                break;
            default:
                console.log(turno.estado)
                throw new Error("Estado de turno no reconocido para notificar");
        }
        const notificacion = new Notificacion(null, destinatario, remitente, mensaje, null, null, null);
        await this.notificacionRepository.create(notificacion);
        return notificacion
    }
    async crearRecordatorio(turno) {
        const mensaje = `Te recordamos el turno de mañana ${turno.fecha} a las ${turno.hora}.`;

        const destinatario = [turno.paciente, turno.medico];

        const notificacion = new Notificacion(null, destinatario, null, mensaje, new Date(), null, false);
        await this.notificacionRepository.create(notificacion)
        return notificacion
    }    
}