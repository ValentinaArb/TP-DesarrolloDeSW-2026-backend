import { Router } from "express";
import disponibilidadController from "../controllers/disponibilidadController.js";

const router = Router();

router.get('/', async (req, res, next) => await disponibilidadController.obtenerTodas(req, res, next));
router.get('/:id', async (req, res, next) => await disponibilidadController.obtenerDisponibilidad(req, res, next));
router.post('/', async (req, res, next) => await disponibilidadController.crearDisponibilidad(req, res, next));
router.delete('/:id', async (req, res, next) => await disponibilidadController.eliminarDisponibilidad(req, res, next));

export default router;