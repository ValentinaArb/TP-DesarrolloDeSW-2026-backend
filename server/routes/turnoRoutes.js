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
 *       400:
 *         description: Parámetros de consulta inválidos
 *       500:
 *         description: Error interno del servidor
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
 *                   - nombre
 *                   - duracionEnMins
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439012"
 *                     description: ID del servicio (práctica)
 *                   nombre:
 *                     type: string
 *                     example: "Operación"
 *                     description: Nombre del servicio
 *                   duracionEnMins:
 *                     type: integer
 *                     example: 60
 *                     description: Duración del turno en minutos
 *               sede:
 *                 type: object
 *                 required:
 *                   - id
 *                   - nombre
 *                   - direccion
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439013"
 *                     description: ID de la sede
 *                   nombre:
 *                     type: string
 *                     example: "Sede Central"
 *                     description: Nombre de la sede
 *                   direccion:
 *                     type: string
 *                     example: "Av. Rivadavia 1234"
 *                     description: Dirección de la sede
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Turno creado exitosamente."
 *                 data:
 *                   type: object
 *                   description: Datos del turno creado
 *       400:
 *         description: Datos inválidos (fecha en formato incorrecto)
 *       422:
 *         description: Error de lógica de negocio (fecha pasada, médico no disponible, etc.)
 *       409:
 *         description: Conflicto (médico ya tiene turno en esa fecha/hora)
 *       500:
 *         description: Error interno del servidor
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 medicoInfo:
 *                   type: object
 *                 pacienteInfo:
 *                   type: object
 *                 servicioInfo:
 *                   type: object
 *                 sedeInfo:
 *                   type: object
 *                 estado:
 *                   type: string
 *       404:
 *         description: Turno no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *       500:
 *         description: Error interno del servidor
 *
 *   patch:
 *     tags:
 *       - Turnos
 *     summary: Modifica el estado de un turno
 *     description: Permite dar de alta o baja un turno. Para dar de alta, use operacion 'alta' y proporcione pacienteId. Para dar de baja, use operacion 'baja' y proporcione motivo.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único del turno en MongoDB
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operacion
 *             properties:
 *               operacion:
 *                 type: string
 *                 enum: ["alta", "baja"]
 *                 example: "baja"
 *                 description: Operación a realizar
 *               pacienteId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439014"
 *                 description: ID del paciente (requerido si operacion es 'alta')
 *               motivo:
 *                 type: string
 *                 example: "Cancelación por enfermedad"
 *                 description: Motivo de la baja (requerido si operacion es 'baja')
 *     responses:
 *       200:
 *         description: Operación realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Turno fue dado de alta con éxito"
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Turno no encontrado
 *       409:
 *         description: Conflicto al cambiar el estado del turno
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (req, res, next) => await turnoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res,next) => await turnoController.obtenerTurno(req, res,next));
router.delete('/:id', async (req, res,next) => await turnoController.eliminarTurno(req, res,next));
router.patch('/:id', async (req, res,next) => await turnoController.modificarEstado(req, res,next));
router.post('/', async (req, res,next) => await turnoController.crearTurno(req, res,next));

export default router;