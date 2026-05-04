import { NotificacionRepository } from "../repositories/notificacionRepository";

const notificacionRepository = new NotificacionRepository()

class FactoryNotificacion {
    static crearSegunEstadoTurno(turno) {
        let mensaje = "";
        let destinatario = [];

        switch (turno.estado) {
            case 'CONFIRMADO':
                mensaje = `Tu turno para el ${turno.fecha} fue confirmado.`;
                destinatario.push(turno.paciente);
                break;
            case 'CANCELADO':
                mensaje = `El turno del día ${turno.fecha} fue cancelado.`;
                destinatario.push(turno.paciente);
                break;
            case 'DISPONIBLE':
                mensaje = `El turno del ${turno.fecha} fue cancelado.`;
                destinatario.push(turno.medico);
                break;
            case 'RESERVADO':
                mensaje = `El turno del ${turno.fecha} fue reservado. 
                Paciente: ${turno.paciente}
                Servicio: ${turno.servicio}`;
                destinatario.push(turno.medico);
                break;
            default:
                throw new Error("Estado de turno no reconocido para notificar");
        }
        const notificacion = new Notificacion(destinatario, mensaje); 
        notificacionRepository.guardar(notificacion)
        return notificacion
    }
    static crearRecordatorio(turno) {
        const mensaje = `Te recordamos el turno de mañana ${turno.fecha} a las ${turno.hora}.`;

        const destinatario = [turno.paciente, turno.medico];

        const notificacion = new Notificacion(destinatario, mensaje);
        notificacionRepository.guardar(notificacion)
        return notificacion
    }    
}