import { Router } from "express";
import turnoController from "../controller/turnoController.js";

const router = Router();

router.get('/', async (req, res) => await turnoController.obtenerTodos(req, res));
router.get('/:id', async (req, res) => await turnoController.obtenerTurno(req, res));
router.delete('/:id', async (req, res) => await turnoController.eliminarTurno(req, res));
router.patch('/:id', async (req, res) => await turnoController.modificarEstado(req, res));
router.post('/', async (req, res) => await turnoController.crearTurno(req, res));

export default router;