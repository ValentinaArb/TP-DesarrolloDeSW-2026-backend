import {NotificacionRepository} from "../repositories/notificacionRepository.js"

export class NotificacionService {
    constructor() {
        this.notificacionRepository = new NotificacionRepository();
    }

    async obtenerTodos(usuarioId){
        const notificaciones = await this.notificacionRepository.findAll()
        return notificaciones.filter((n) => n.destinatario.id == usuarioId);
    }  

    marcarLeida(id){
        const notificacion = this.notificacionRepository.findById(id)
        notificacion.marcarLeida()
        this.notificacionRepository.update(notificacion,id)
    }
}