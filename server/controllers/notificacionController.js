import { NotificacionService } from '../services/notificacionService.js';
import { NotificacionRepository } from '../repositories/notificacionRepository.js';

export class NotificacionController {
    constructor() {
        this.notificacionService = new NotificacionService();
    }

    // GET /notificaciones/:id?estaLeida=true/false
    async obtenerTodosFiltrados(req, res,next) {
        try {
            const {id} = req.params;
            const {estaLeida} = req.query;

            const notificacionesUsuario = await this.notificacionService.obtenerTodosFiltrados(id);
            
            // Si se proporciona estaLeida, filtrar por ese valor
            const notificacionesFiltradas = estaLeida !== undefined 
                ? notificacionesUsuario.filter((n) => n.estaLeida === (estaLeida === 'true'))
                : notificacionesUsuario;

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

    async marcarComoLeida(req, res, next){
        try {
            const {id} = req.params;
            await this.notificacionService.marcarComoLeida(id);
            res.status(200).json({mensaje : "La notificación fue leída con éxito"});;
        } catch(error) {
            return next(error);
        }
    }
}