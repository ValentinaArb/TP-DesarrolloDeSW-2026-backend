import { Router } from "express";
import disponibilidadController from "../controllers/disponibilidadController.js";

const router = Router();

/**
 * @openapi
 * /disponibilidades:
 *   get:
 *     tags:
 *       - Disponibilidades
 *     summary: Obtiene todas las disponibilidades
 *
 *   post:
 *     tags:
 *       - Disponibilidades
 *     summary: Crear una nueva disponibilidad
 *
 * ./disponibilidades/{id}:
 *   get:
 *     tags:
 *       - Disponibilidades
 *     summary: Obtiene disponibilidad por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *
 *   delete:
 *     tags:
 *       - Disponibilidades
 *     summary: Eliminar disponibilidad
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */

router.get('/', async (req, res, next) => await disponibilidadController.obtenerTodas(req, res, next));
router.get('/:id', async (req, res, next) => await disponibilidadController.obtenerDisponibilidad(req, res, next));
router.post('/', async (req, res, next) => await disponibilidadController.crearDisponibilidad(req, res, next));
router.delete('/:id', async (req, res, next) => await disponibilidadController.eliminarDisponibilidad(req, res, next));

export default router;