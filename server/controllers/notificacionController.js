import { NotificacionService } from '../services/notificacionService.js';
import { NotificacionRepository } from '../repositories/notificacionRepository.js';

export class NotificacionController {
    constructor() {
        this.notificacionService = new NotificacionService();
    }

    // GET /notificaciones
    async obtenerTodosFiltrados(req, res,next) {
        try {
            const {id} = req.params;
            const {estaLeida} = req.body;

            const notificacionesUsuario = await this.notificacionService.obtenerTodosFiltrados(id);
            const notificacionesFiltradas = notificacionesUsuario.filter((n) => n.estaLeida === estaLeida)

            res.status(200).json(notificacionesFiltradas);
        } catch(error) {
            return next(error);
        }
    }

    async obtenerTodos(req, res,next) {
        try {
            const notificacionesUsuario = await this.notificacionService.obtenerTodos();

            res.status(200).json(notificacionesUsuario);
        } catch(error) {
            return next(error);
        }
    }

    async marcarLeida(req, res, next){
        try {
            const {id} = req.params;
            await this.notificacionService.marcarLeida(id);
            res.status(200).json({mensaje : "La notificación fue leída con éxito"});;
        } catch(error) {
            return next(error);
        }
    }
}