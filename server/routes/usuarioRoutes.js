import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = Router();
router.post('/', async (req, res,next) => await usuarioController.reservarTurno(req, res,next));
