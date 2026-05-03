import {NotificacionRepository} from "../repositories/notificacionRepository"

class NotificacionService {
    constructor() {
        this.notificacionRepository = new NotificacionRepository();
    }

    async obtenerTodos(usuarioId){
        return await this.notificacionRepository.findAll().filter((n) => n.usuarioId == usuarioId);
    }  

    marcarLeida(id){
        const notificacion = this.notificacionRepository.findById(id)
        notificacion.marcarLeida()
        this.notificacionRepository.update(notificacion,id)
    }
}