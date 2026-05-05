import { NotificacionRepository } from "../repositories/notificacionRepository.js";

export class FactoryNotificacion {

    constructor() {
        this.notificacionRepository = new NotificacionRepository()
    }

    static crearSegunEstadoTurno(turno) {
        let mensaje = "";
        let destinatario;

        switch (turno.estado) {
            case 'CONFIRMADO':
                mensaje = `Tu turno para el ${turno.fecha} fue confirmado.`;
                destinatario = turno.paciente;
                break;
            case 'CANCELADO':
                mensaje = `El turno del día ${turno.fecha} fue cancelado.`;
                destinatario = turno.paciente;
                break;
            case 'DISPONIBLE':
                mensaje = `El turno del ${turno.fecha} fue cancelado.`;
                destinatario = turno.medico;
                break;
            case 'RESERVADO':
                mensaje = `El turno del ${turno.fecha} fue reservado. 
                Paciente: ${turno.paciente}
                Servicio: ${turno.servicio}`;
                destinatario = turno.medico;
                break;
            default:
                throw new Error("Estado de turno no reconocido para notificar");
        }
        const notificacion = new Notificacion(destinatario, mensaje); 
        this.notificacionRepository.create(notificacion)
        return notificacion
    }
    static crearRecordatorio(turno) {
        const mensaje = `Te recordamos el turno de mañana ${turno.fecha} a las ${turno.hora}.`;

        const destinatario = [turno.paciente, turno.medico];

        const notificacion = new Notificacion(destinatario, mensaje);
        this.notificacionRepository.create(notificacion)
        return notificacion
    }    
}