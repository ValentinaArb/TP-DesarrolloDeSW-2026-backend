import express from "express";
import healthcheckRoutes from "./healthcheckRoutes.js";
import turnoRoutes from "./turnoRoutes.js";
import disponibilidadRoutes from "./disponibilidadRoutes.js";
import medicoRoutes from "./medicoRoutes.js";
import notificacionesRoute from "./notificacionRoute.js";

const router = express.Router()
/**
 * @openapi
 * /usuarios:
 * get:
 * description: Retorna una lista de todos los usuarios
 * responses:
 * 200:
 * description: Éxito
 */
router.get('/usuarios', (req, res) => {
  res.send('Lista de usuarios');
});
router.use('/health',healthcheckRoutes);
router.use('/turnos',turnoRoutes);
router.use('/disponibilidades',disponibilidadRoutes);
router.use('/medicos',medicoRoutes);
router.use('/notificaciones',notificacionesRoute);

export default router