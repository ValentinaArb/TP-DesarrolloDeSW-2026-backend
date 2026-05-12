import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = Router();

/**
 * @openapi
 * /pacientes/{pacienteId}/turnos:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtiene el historial de turnos de un paciente
 *     parameters:
 *       - name: pacienteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del paciente
 *     responses:
 *       200:
 *         description: Historial de turnos obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   medicoInfo:
 *                     type: object
 *                   servicioInfo:
 *                     type: object
 *                   sedeInfo:
 *                     type: object
 *                   estado:
 *                     type: string
 *                   fechaInicio:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: ID de paciente inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Paciente no encontrado
 *       500:
 *         description: Error del servidor
 * 
 * /pacientes/{pacienteId}/turnos/{turnoId}:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Reservar un turno para un paciente
 *     parameters:
 *       - name: pacienteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del paciente
 *       - name: turnoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del turno a reservar
 *     responses:
 *       200:
 *         description: Turno reservado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Turno reservado exitosamente"
 *                 data:
 *                   type: object
 *       400:
 *         description: IDs inválidos o parámetros faltantes
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Paciente o turno no encontrado
 *       409:
 *         description: El turno ya está reservado o no está disponible
 *       500:
 *         description: Error del servidor
 * 
 *   patch:
 *     tags:
 *       - Pacientes
 *     summary: Cancelar un turno reservado por un paciente
 *     parameters:
 *       - name: pacienteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del paciente
 *       - name: turnoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del turno a cancelar
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *                 example: "No puedo asistir"
 *                 description: Motivo opcional de la cancelación
 *     responses:
 *       200:
 *         description: Turno cancelado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Turno cancelado exitosamente"
 *       400:
 *         description: IDs inválidos o parámetros incorrectos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Paciente o turno no encontrado
 *       409:
 *         description: El turno no puede ser cancelado en este estado o no pertenece al paciente
 *       500:
 *         description: Error del servidor
 */

router.post('/:pacienteId/turnos/:turnoId', async (req, res,next) => await usuarioController.reservarTurno(req, res,next));
router.patch('/:pacienteId/turnos/:turnoId', async(req, res, next) => await usuarioController.cancelarTurno(req, res, next));
router.get('/:pacienteId/turnos', async( req, res, next) => await usuarioController.obtenerHistorialTurnos(req, res, next));

export default router;