import { Router } from "express";
import medicoController from "../controllers/medicoController.js";

const router = Router();

router.get('/', async (req, res, next) => await medicoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res, next) => await medicoController.obtenerMedico(req, res, next));
router.post('/', async (req, res, next) => await medicoController.crearMedico(req, res, next));
router.delete('/:id', async (req, res, next) => await medicoController.eliminarMedico(req, res, next));
router.patch('/:id/altaDisponibilidad', async (req, res, next) => await medicoController.altaDisponibilidad(req, res));
router.patch('/:id/bajaDisponibilidad', async (req, res, next) => await medicoController.bajaDisponibilidad(req, res));

export default router;