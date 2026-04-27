import { Router } from "express";
import disponibilidadController from "../controllers/disponibilidadController.js";

const router = Router();

router.get('/', async (req, res) => await disponibilidadController.obtenerTodas(req, res));
router.get('/:id', async (req, res) => await disponibilidadController.obtenerDisponibilidad(req, res));
router.post('/', async (req, res) => await disponibilidadController.crearDisponibilidad(req, res));
router.delete('/:id', async (req, res) => await disponibilidadController.eliminarDisponibilidad(req, res));
// innecesario
//router.put('/:id', (req, res) => disponibilidadController.actualizarDisponibilidad(req, res));

export default router;