import { Router } from "express";
import medicoController from "../controller/medicoController.js";

const router = Router();

router.get('/', async (req, res) => await medicoController.obtenerTodos(req, res));
router.get('/:id', async (req, res) => await medicoController.obtenerMedico(req, res));
router.post('/', async (req, res) => await medicoController.crearMedico(req, res));
router.delete('/:id', async (req, res) => await medicoController.eliminarMedico(req, res));
router.patch('/:id/altaDisponibilidad', async (req, res) => await medicoController.altaDisponibilidad(req, res));
router.patch('/:id/bajaDisponibilidad', async (req, res) => await medicoController.bajaDisponibilidad(req, res));

export default router;