import {NotificacionRepository} from "../repositories/notificacionRepository.js"
import {NotFoundError} from "../errors/AppError.js"

export class NotificacionService {
    constructor() {
        this.notificacionRepository = new NotificacionRepository();
    }

    async obtenerTodosFiltrados(usuarioId){
        const notificaciones = await this.notificacionRepository.findAll()
        return notificaciones.filter((n) => n.destinatario.id == usuarioId);
    }

    async obtenerTodos(){
        const notificaciones = await this.notificacionRepository.findAll()
        return notificaciones;
    }

    async marcarComoLeida(id){
        const notificacion = await this.notificacionRepository.findById(id)
        if(!notificacion){
            throw new NotFoundError(`No se encontró la notificación con ID: ${id}`);
        }
        try{
            notificacion.marcarComoLeida()
            await this.notificacionRepository.update(notificacion,id)
        }catch(error){
            console.error("Error al marcar como leido el turno:", error);
            throw error;
        }
    }
}