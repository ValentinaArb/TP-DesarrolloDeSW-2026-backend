import { Router } from "express";
import servicioController from "../controllers/servicioController.js";

const router = Router();

// GET /servicios
router.get('/', async (req, res, next) => await servicioController.obtenerTodos(req, res, next));

export default router;