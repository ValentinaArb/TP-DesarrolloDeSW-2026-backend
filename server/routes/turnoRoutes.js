import { Router } from "express";
import turnoController from "../controller/turnoController.js";


const router = Router();

router.get('/', (req, res) => turnoController.obtenerTodos(req, res));
router.get('/:id', (req, res) => turnoController.obtenerTurno(req, res));

export default router;