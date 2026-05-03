import { Router } from "express";
import healthcheckController from "../controllers/healthcheckController.js";

const router = Router();

router.get("/", healthcheckController.healthcheck);

export default router;