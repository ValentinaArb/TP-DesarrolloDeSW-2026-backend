import { NotificacionService } from '../services/notificacionService.js';
import { NotificacionRepository } from '../repositories/notificacionRepository.js';

export class NotificacionController {
    constructor() {
        this.notificacionService = new NotificacionService();
    }

    // GET /notificaciones
    async obtenerTodos(req, res,next) {
        try {
            const {id} = req.params;
            const {estaLeida} = req.body;
            
            console.log(id)
            console.log(estaLeida)

            const notificacionesUsuario = await this.notificacionService.obtenerTodos(id);
            const notificacionesFiltradas = notificacionesUsuario.filter((n) => n.estaLeida === estaLeida)

            console.log(notificacionesUsuario)
            console.log(notificacionesFiltradas)

            res.status(200).json(notificacionesFiltradas);
        } catch(error) {
            return next(error);
        }
    }

    async marcarLeida(){
        try {
            const {id} = req.params;
            this.notificacionService.marcarLeida(id);

            res.status(200);
        } catch(error) {
            return next(error);
        }
    }
}