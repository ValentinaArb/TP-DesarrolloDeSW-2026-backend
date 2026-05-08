import { Router } from "express";
import turnoController from "../controllers/turnoController.js";

const router = Router();

/**
 * @openapi
 * /turnos:
 *   get:
 *     tags:
 *       - Turnos
 *     summary: Obtiene todos los turnos paginados
 *     description: Retorna una lista de turnos desde MongoDB con información de paginación.
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 data: { type: array, items: { type: object } }
 *                 paginacion: { type: object }
 * 
 *   post:
 *     tags:
 *       - Turnos
 *     summary: Crea un nuevo turno
 *     description: Registra un nuevo turno en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paciente: { type: string }
 *               fecha: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *
 * /turnos/{id}:
 *   get:
 *     tags:
 *       - Turnos
 *     summary: Obtiene un turno específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del turno en MongoDB
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turno encontrado
 *
 *   delete:
 *     tags:
 *       - Turnos
 *     summary: Elimina un turno
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente
 *
 *   patch:
 *     tags:
 *       - Turnos
 *     summary: Modifica el estado de un turno
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado: { type: string }
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.get('/', async (req, res, next) => await turnoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res,next) => await turnoController.obtenerTurno(req, res,next));
router.delete('/:id', async (req, res,next) => await turnoController.eliminarTurno(req, res,next));
router.patch('/:id', async (req, res,next) => await turnoController.modificarEstado(req, res,next));
router.post('/', async (req, res,next) => await turnoController.crearTurno(req, res,next));

export default router;