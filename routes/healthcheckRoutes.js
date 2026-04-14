import { Router } from "express";
import healthcheckController from "../controller/healthcheckController.js";

const router = Router();

router.get("/", healthcheckController.healthcheck);

export default router;