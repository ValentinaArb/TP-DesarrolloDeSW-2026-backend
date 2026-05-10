import { Router } from "express";
import medicoController from "../controllers/medicoController.js";

const router = Router();

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
router.patch("/servicios/:id", async(req, res, next) => await medicoController.modificarServicio(req, res, next));
router.delete("/:idMedico/servicios/:idServicio", async(req, res, next) => await medicoController.darDeBajaServicio(req, res, next));
router.post("/:idMedico/servicios/:idServicio", async(req, res, next) => await medicoController.darAltaServicio(req, res, next))
export default router;