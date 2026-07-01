import express from "express";
import healthcheckRoutes from "./healthcheckRoutes.js";
import turnoRoutes from "./turnoRoutes.js";
import disponibilidadRoutes from "./disponibilidadRoutes.js";
import medicoRoutes from "./medicoRoutes.js";
import notificacionRoute from "./notificacionRoute.js";
import pacienteRoutes from "./pacienteRoutes.js";
import authRoutes from "./authRoutes.js";
import servicioRoutes from "./servicioRoutes.js";
import sedeRoutes from "./sedeRoutes.js";

const router = express.Router();

router.use('/health', healthcheckRoutes);
router.use('/turnos', turnoRoutes);
router.use('/auth', authRoutes);
router.use('/disponibilidades', disponibilidadRoutes);
router.use('/medicos', medicoRoutes);
router.use('/notificaciones', notificacionRoute);
router.use('/pacientes', pacienteRoutes);
router.use('/servicios', servicioRoutes);
router.use('/sedes', sedeRoutes);

export default router;