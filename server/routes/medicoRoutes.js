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
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
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
 *       201:
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
 *       201:
 *         description: Médico eliminado exitosamente
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
 *     responses:
 *       201:
 *         description: Disponibilidad agregada al médico exitosamente
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
 *       201:
 *         description: Disponibilidad eliminada del médico exitosamente
 */

router.get('/', async (req, res, next) => await medicoController.obtenerTodos(req, res, next));
router.get('/:id', async (req, res, next) => await medicoController.obtenerMedico(req, res, next));
router.post('/', async (req, res, next) => await medicoController.crearMedico(req, res, next));
router.delete('/:id', async (req, res, next) => await medicoController.eliminarMedico(req, res, next));
router.post('/:id/disponibilidad', async (req, res, next) => await medicoController.agregarDisponibilidad(req, res, next));
router.delete('/:id/disponibilidad/:idDisponibilidad', async (req, res, next) => await medicoController.eliminarDisponibilidad(req, res, next));

export default router;