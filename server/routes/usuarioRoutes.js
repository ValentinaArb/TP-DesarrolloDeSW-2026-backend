import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.post('/:pacienteId/turnos/:turnoId', async (req, res,next) => await usuarioController.reservarTurno(req, res,next));
router.patch('/pacientes/:id/turnos/:id', async(req, res, next) => await usuarioController.cancelarTurno(req, res, next));
router.get('/:pacienteId/turnos', async( req, res, next) => await usuarioController.obtenerHistorialTurnos(req, res, next));

export default router;