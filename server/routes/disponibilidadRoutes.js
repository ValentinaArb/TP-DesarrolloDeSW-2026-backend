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
 *     responses:
 *       200:
 *         description: Lista de disponibilidades
 *
 *   post:
 *     tags:
 *       - Disponibilidades
 *     summary: Crear una nueva disponibilidad
 *     responses:
 *       200:
 *         description: Disponibilidad creada con éxito
 *
 * /disponibilidades/{id}:
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
 *     responses:
 *       200:
 *         description: Disponibilidad obtenida de forma exitosa
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
 *     responses:
 *       200:
 *         description: Disponibilidad eliminada con éxito
 */

router.get('/', async (req, res, next) => await disponibilidadController.obtenerTodas(req, res, next));
router.get('/:id', async (req, res, next) => await disponibilidadController.obtenerDisponibilidad(req, res, next));
router.post('/', async (req, res, next) => await disponibilidadController.crearDisponibilidad(req, res, next));
router.delete('/:id', async (req, res, next) => await disponibilidadController.eliminarDisponibilidad(req, res, next));

export default router;