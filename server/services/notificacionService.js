import {NotificacionRepository} from "../repositories/notificacionRepository.js"

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

    async marcarLeida(id){
        try{
            const notificacion = await this.notificacionRepository.findById(id)
            notificacion.marcarComoLeida()
            this.notificacionRepository.update(notificacion,id)
        }catch(error){
            console.error("Error al marcar como leido el turno", error);
            throw error;
        }
    }
}