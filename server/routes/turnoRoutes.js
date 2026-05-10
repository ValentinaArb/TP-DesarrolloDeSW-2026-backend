import { Router } from "express";
import turnoController from "../controllers/turnoController.js";

const router = Router();

router.get('/busqueda', async (req, res, next) => await turnoController.buscarTurnosDisponibles(req, res, next));
router.get('/', async (req, res,next) => await turnoController.obtenerTodos(req, res,next));
router.post('/', async (req, res,next) => await turnoController.crearTurno(req, res,next));
router.get('/:id', async (req, res,next) => await turnoController.obtenerTurno(req, res,next));
router.patch('/:id', async (req, res,next) => await turnoController.modificarEstado(req, res,next));
router.delete('/:id', async (req, res,next) => await turnoController.eliminarTurno(req, res,next));

export default router;