import { Router } from "express";
import sedeController from "../controllers/sedeController.js";

const router = Router();

// GET /sedes
router.get('/', async (req, res, next) => await sedeController.obtenerTodas(req, res, next));

export default router;