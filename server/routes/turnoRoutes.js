import { Router } from "express";
import turnoController from "../controllers/turnoController.js";

const router = Router();

router.get('/', async (req, res) => await turnoController.obtenerTodos(req, res));
router.get('/:id', async (req, res) => await turnoController.obtenerTurno(req, res));
router.delete('/:id', async (req, res) => await turnoController.eliminarTurno(req, res));
router.patch('/:id/darAlta', async (req, res) => await turnoController.darDeAlta(req, res));
router.patch('/:id/darBaja', async (req, res) => await turnoController.darDeBaja(req, res));
router.post('/crear', async (req, res) => await turnoController.crearTurno(req, res));

export default router;