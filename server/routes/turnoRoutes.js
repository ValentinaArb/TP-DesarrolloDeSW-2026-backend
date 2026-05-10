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
 *     description: Registra un nuevo turno en la base de datos. El turno se crea con estado DISPONIBLE.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicoId
 *               - fechaInicio
 *               - servicio
 *               - sede
 *             properties:
 *               medicoId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *                 description: ID del médico que atiende el turno
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-15T09:00:00"
 *                 description: Fecha y hora de inicio del turno
 *               servicio:
 *                 type: object
 *                 required:
 *                   - id
 *                   - duracionEnMins
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439012"
 *                     description: ID del servicio
 *                   nombre:
 *                     type: string
 *                     example: "Cardiología"
 *                   duracionEnMins:
 *                     type: integer
 *                     example: 30
 *                     description: Duración del turno en minutos
 *               sede:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439013"
 *                     description: ID de la sede
 *                   nombre:
 *                     type: string
 *                     example: "Sede Central"
 *                   direccion:
 *                     type: string
 *                     example: "Av. Rivadavia 1234"
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *       400:
 *         description: Datos inválidos (fecha en formato incorrecto)
 *       422:
 *         description: Error de lógica de negocio (fecha pasada, médico no disponible, etc.)
 *       409:
 *         description: Conflicto (médico ya tiene turno en esa fecha/hora)
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
 *       204:
 *         description: Turno eliminado correctamente
 *       404:
 *         description: Turno no encontrado
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
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [DISPONIBLE, RESERVADO, CANCELADO]
 *                 example: "RESERVADO"
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Turno no encontrado
 */
router.get('/', async (req, res, next) => await turnoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res,next) => await turnoController.obtenerTurno(req, res,next));
router.delete('/:id', async (req, res,next) => await turnoController.eliminarTurno(req, res,next));
router.patch('/:id', async (req, res,next) => await turnoController.modificarEstado(req, res,next));
router.post('/', async (req, res,next) => await turnoController.crearTurno(req, res,next));

export default router;