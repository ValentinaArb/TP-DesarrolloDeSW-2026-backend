import { NotificacionService } from '../services/notificacionService.js';
import { NotificacionRepository } from '../repositories/notificacionRepository.js';

class notificacionController {
    constructor() {

    }

    // GET /notificaciones
    async obtenerTodos(req, res,next) {
        try {
            const {usuarioId} = req.params;
            const {estaLeida} = req.body;
            
            const notificacionesUsuario = await this.NotificacionService.obtenerTodos(usuarioId);
            const notificacionesFiltradas = notificacionesUsuario.filter((n) => n.estaLeida == estaLeida)

            res.status(200).json(notificacionesFiltradas);
        } catch(error) {
            return next(error);
        }
    }

    async marcarLeida(){
        try {
            const {id} = req.params;
            this.NotificacionService.marcarLeida(id);

            res.status(200);
        } catch(error) {
            return next(error);
        }
    }
}