import { Router } from "express";
import { NotificacionController } from "../controllers/notificacionController.js";

const router = Router();
const notificacionController = new NotificacionController()

/**
 * @openapi
 * /notificaciones:
 *   get:
 *     tags:
 *       - Notificaciones
 *     summary: Obtiene todas las notificaciones
 *
 * ./notificaciones/{id}:
 *   get:
 *     tags:
 *       - Notificaciones
 *     summary: Obtiene notificaciones filtradas por ID de usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *
 *   patch:
 *     tags:
 *       - Notificaciones
 *     summary: Marcar notificación como leída
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */

router.get('/:id', async (req, res, next) => await notificacionController.obtenerTodosFiltrados(req, res, next));
router.get('/', async (req, res, next) => await notificacionController.obtenerTodos(req, res, next));
router.patch('/:id',async (req, res, next) => await notificacionController.marcarComoLeida(req, res, next));

export default router;