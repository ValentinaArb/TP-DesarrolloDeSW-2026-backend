import { Router } from "express";
import servicioController from "../controllers/servicioController.js";

const router = Router();

// GET /servicios
router.get('/', async (req, res, next) => await servicioController.obtenerTodos(req, res, next));

// POST /servicios
router.post('/', async (req, res, next) => await servicioController.crearServicio(req, res, next));

export default router;