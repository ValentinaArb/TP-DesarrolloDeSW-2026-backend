import express from "express";
import healthcheckRoutes from "./healthcheckRoutes.js";
import turnoRoutes from "./turnoRoutes.js";

const router = express.Router()

router.use('/health',healthcheckRoutes);
router.use('/turnos',turnoRoutes);

export default router