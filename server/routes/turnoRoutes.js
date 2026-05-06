import { Router } from "express";
import turnoController from "../controllers/turnoController.js";

const router = Router();

router.get('/', async (req, res,next) => await turnoController.obtenerTodos(req, res,next));
router.get('/:id', async (req, res,next) => await turnoController.obtenerTurno(req, res,next));
router.delete('/:id', async (req, res,next) => await turnoController.eliminarTurno(req, res,next));
router.patch('/:id', async (req, res,next) => await turnoController.modificarEstado(req, res,next));
router.post('/', async (req, res,next) => await turnoController.crearTurno(req, res,next));
router.get('/pacientes/:pacienteId/turnos', async( req, res, next) => await turnoController.obtenerHistorialTurnos(req, res, next));

export default router;