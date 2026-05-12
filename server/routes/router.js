import express from "express";
import healthcheckRoutes from "./healthcheckRoutes.js";
import turnoRoutes from "./turnoRoutes.js";
import disponibilidadRoutes from "./disponibilidadRoutes.js";
import medicoRoutes from "./medicoRoutes.js";
import notificacionRoute from "./notificacionRoute.js";
import pacienteRoutes from "./pacienteRoutes.js";

const router = express.Router()

router.use('/health',healthcheckRoutes);
router.use('/turnos',turnoRoutes);
router.use('/disponibilidades',disponibilidadRoutes);
router.use('/medicos',medicoRoutes);
router.use('/notificaciones',notificacionRoute);
router.use('/pacientes', pacienteRoutes);

export default router