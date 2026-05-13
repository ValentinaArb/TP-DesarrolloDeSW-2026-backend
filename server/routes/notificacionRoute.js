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
 *     responses:
 *       200:
 *         description: Notificaciones obtenidas exitosamente
 * 
 * /notificaciones/{id}:
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
 *       - name: estaLeida
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Filtrar por notificaciones leídas (true) o no leídas (false)
 *     responses:
 *       200:
 *         description: Notificaciones obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   estaLeida:
 *                     type: boolean
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
 *     responses:
 *       200:
 *         description: Notificación marcada como leída exitosamente
 *       404:
 *         description: Notificación no encontrada
 */

//GET
router.get('/:id', async (req, res, next) => await notificacionController.obtenerTodosFiltrados(req, res, next));
router.get('/', async (req, res, next) => await notificacionController.obtenerTodos(req, res, next));

//PATCH
router.patch('/:id',async (req, res, next) => await notificacionController.marcarComoLeida(req, res, next));

export default router;