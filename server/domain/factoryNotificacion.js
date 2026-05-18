import { BadRequestError } from "../errors/AppError.js";
import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { Notificacion } from "./notificacion.js";

export class FactoryNotificacion {

    constructor() {
        this.notificacionRepository = new NotificacionRepository()
    }

    async crearNotificacion(turno) {
        const { mensaje, destinatario, remitente } = turno.crearMensaje();
        const notificacion = new Notificacion(null, destinatario, remitente, mensaje, null, null, false);
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