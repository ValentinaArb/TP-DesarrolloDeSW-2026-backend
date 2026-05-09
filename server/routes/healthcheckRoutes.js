import { Router } from "express";
import healthcheckController from "../controllers/healthcheckController.js";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - System
 *     summary: Verifica el estado del servidor
 */
router.get("/", healthcheckController.healthcheck);

export default router;