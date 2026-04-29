import { Router } from "express";
import medicoController from "../controllers/medicoController.js";

const router = Router();

router.get('/', async (req, res) => await medicoController.obtenerTodos(req, res));
router.get('/:id', async (req, res) => await medicoController.obtenerMedico(req, res));
router.post('/', async (req, res) => await medicoController.crearMedico(req, res));
router.delete('/:id', async (req, res) => await medicoController.eliminarMedico(req, res));
router.post('/:id/disponibilidad', async (req, res) => await medicoController.agregarDisponibilidad(req, res));
router.delete('/:id/disponibilidad/:idDisponibilidad', async (req, res) => await medicoController.eliminarDisponibilidad(req, res));

export default router;