import { Router } from "express";
import { NotificacionController } from "../controllers/notificacionController.js";

const router = Router();
const notificacionController = new NotificacionController()

router.get('/:id', async (req, res, next) => await notificacionController.obtenerTodosFiltrados(req, res, next));
router.get('/', async (req, res, next) => await notificacionController.obtenerTodos(req, res, next));
router.patch('/:id',async (req, res, next) => await notificacionController.marcarLeida(req, res, next));

export default router;