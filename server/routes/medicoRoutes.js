import { Router } from "express";
import medicoController from "../controllers/medicoController.js";

const router = Router();

/**
 * @openapi
 * /medicos:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Obtiene todos los médicos
 *     responses:
 *       201:
 *         description: Medicos obtenidos exitosamente
 *
 *   post:
 *     tags:
 *       - Medicos
 *     summary: Crear un nuevo médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               usuario:
 *                 type: string
 *                 example: "jperez_med"
 *               matricula:
 *                 type: string
 *                 example: "MN12345"
 *               servicios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Cardiología"
 *               sedes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Sede Central"
 *                     direccion:
 *                       type: string
 *                       example: "Av. Rivadavia 1234"
 *               disponibilidades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     diaSemana:
 *                       type: integer
 *                       example: 1
 *                     horaDesde:
 *                       type: string
 *                       format: time
 *                       example: "08:00:00"
 *                     horaHasta:
 *                       type: string
 *                       format: time
 *                       example: "12:00:00"
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 * 
 * /medicos/{id}:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Obtiene un médico por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico obtenido exitosamente
 * 
 *   delete:
 *     tags:
 *       - Medicos
 *     summary: Eliminar un médico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Médico eliminado exitosamente
 *       404:
 *         description: Médico no encontrado
 * 
 * /medicos/{id}/disponibilidad:
 *   post:
 *     tags:
 *       - Medicos
 *     summary: Agregar disponibilidad a un médico
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
 *       200:
 *         description: Disponibilidad agregada al médico exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Médico no encontrado
 * 
 * /medicos/{id}/disponibilidad/{idDisponibilidad}:
 *   delete:
 *     tags:
 *       - Medicos
 *     summary: Eliminar disponibilidad específica
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: idDisponibilidad
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Disponibilidad eliminada del médico exitosamente
 *       404:
 *         description: Médico o disponibilidad no encontrado
 * 
 * /medicos/{medicoId}/disponibilidades/{disponibilidadId}:
 *   put:
 *     tags:
 *       - Medicos
 *     summary: Modificar disponibilidad específica
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: disponibilidadId
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
 *               diaSemana:
 *                 type: integer
 *                 example: 2
 *               horaDesde:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               horaHasta:
 *                 type: string
 *                 format: time
 *                 example: "13:00:00"
 *     responses:
 *       200:
 *         description: Disponibilidad modificada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Médico o disponibilidad no encontrado
 * 
 * /medicos/{medicoId}/turnos/{turnoId}:
 *   patch:
 *     tags:
 *       - Medicos
 *     summary: Marcar turno como realizado
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: turnoId
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
 *               estado:
 *                 type: string
 *                 example: "REALIZADO"
 *     responses:
 *       200:
 *         description: Turno marcado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Médico o turno no encontrado
 *       409:
 *         description: El turno no puede ser modificado en este estado
 * 
 * /medicos/{medicoId}/turnos/{turnoId}/cancelar:
 *   patch:
 *     tags:
 *       - Medicos
 *     summary: Cancelar un turno
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: turnoId
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
 *               motivo:
 *                 type: string
 *                 example: "Motivo de cancelación"
 *     responses:
 *       200:
 *         description: Turno cancelado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Médico o turno no encontrado
 *       409:
 *         description: El turno no puede ser cancelado en este estado
 * 
 * /medicos/{medicoId}/pacientes/{pacienteId}:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Consultar historial de turnos de un paciente
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: pacienteId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: estado
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrar por estado del turno (DISPONIBLE, RESERVADO, CANCELADO, etc.)
 *     responses:
 *       200:
 *         description: Historial obtenido exitosamente
 *       404:
 *         description: Médico o paciente no encontrado
 * 
 * /medicos/{medicoId}/servicios/{servicioId}:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Consultar disponibilidad para un servicio específico
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: servicioId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disponibilidad obtenida exitosamente
 *       404:
 *         description: Médico o servicio no encontrado
 *   delete:
 *     tags:
 *       - Medicos
 *     summary: Dar de baja un servicio del médico
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: servicioId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Servicio dado de baja exitosamente
 *       404:
 *         description: Médico o servicio no encontrado
 *   post:
 *     tags:
 *       - Medicos
 *     summary: Dar de alta un servicio del médico
 *     parameters:
 *       - name: medicoId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: servicioId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Servicio dado de alta exitosamente
 *       404:
 *         description: Médico o servicio no encontrado
 * 
 * /medicos/servicios/{servicioId}:
 *   put:
 *     tags:
 *       - Medicos
 *     summary: Modificar un servicio
 *     parameters:
 *       - name: servicioId
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
 *               nombre:
 *                 type: string
 *                 example: "Cardiología"
 *               duracionTurno:
 *                 type: integer
 *                 example: 60
 *               costo:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Servicio modificado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Servicio no encontrado
 */

router.get('/', async (req, res, next) => await medicoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res, next) => await medicoController.obtenerMedico(req, res, next));
router.post('/', async (req, res, next) => await medicoController.crearMedico(req, res, next));
router.delete('/:id', async (req, res, next) => await medicoController.eliminarMedico(req, res, next));
router.post('/:id/disponibilidad', async (req, res, next) => await medicoController.agregarDisponibilidad(req, res, next));
router.delete('/:id/disponibilidad/:idDisponibilidad', async (req, res, next) => await medicoController.eliminarDisponibilidad(req, res, next));
router.put("/:medicoId/disponibilidades/:disponibilidadId", async(req, res, next) => await medicoController.modificarDisponibilidad(req, res, next));
router.patch("/:medicoId/turnos/:turnoId", async(req, res, next) => await medicoController.marcarTurnoComo(req, res, next));
router.patch("/:medicoId/turnos/:turnoId/cancelar", async(req, res, next) => await medicoController.cancelarTurno(req, res, next));
router.get("/:medicoId/pacientes/:pacienteId", async(req, res, next) => await medicoController.consultarHistorialTurnos(req, res, next));
router.get("/:medicoId/servicios/:servicioId", async(req, res, next) => await medicoController.consultarDisponibilidad(req, res, next));
router.put("/servicios/:servicioId", async(req, res, next) => await medicoController.modificarServicio(req, res, next));
router.delete("/:medicoId/servicios/:servicioId", async(req, res, next) => await medicoController.darDeBajaServicio(req, res, next));
router.post("/:medicoId/servicios/:servicioId", async(req, res, next) => await medicoController.darAltaServicio(req, res, next))
export default router;