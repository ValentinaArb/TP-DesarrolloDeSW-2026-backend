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