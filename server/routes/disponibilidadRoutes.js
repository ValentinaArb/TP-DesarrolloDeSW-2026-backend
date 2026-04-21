import { Router } from "express";
import disponibilidadController from "../controller/disponibilidadController.js";

const router = Router();

router.get('/', (req, res) => disponibilidadController.obtenerTodas(req, res));
router.get('/:id', (req, res) => disponibilidadController.obtenerDisponibilidad(req, res));
router.post('/', (req, res) => disponibilidadController.crearDisponibilidad(req, res));
router.delete('/:id', (req, res) => disponibilidadController.eliminarDisponibilidad(req, res));
// innecesario
//router.put('/:id', (req, res) => disponibilidadController.actualizarDisponibilidad(req, res));

export default router;