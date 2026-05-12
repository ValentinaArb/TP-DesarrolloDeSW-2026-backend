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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diaSemana
 *               - horaDesde
 *               - horaHasta
 *             properties:
 *               diaSemana:
 *                 type: integer
 *                 example: 1
 *               horaDesde:
 *                 type: string
 *                 format: time
 *                 example: "08:00:00"
 *               horaHasta:
 *                 type: string
 *                 format: time
 *                 example: "12:00:00"
 *     responses:
 *       201:
 *         description: Disponibilidad creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
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
 *       404:
 *         description: Disponibilidad no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', async (req, res, next) => await disponibilidadController.obtenerTodas(req, res, next));
router.get('/:id', async (req, res, next) => await disponibilidadController.obtenerDisponibilidad(req, res, next));
router.post('/', async (req, res, next) => await disponibilidadController.crearDisponibilidad(req, res, next));
router.delete('/:id', async (req, res, next) => await disponibilidadController.eliminarDisponibilidad(req, res, next));

export default router;