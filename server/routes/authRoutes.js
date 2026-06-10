import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

const router = Router();
const authController = new AuthController();

router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/register", (req, res, next) => authController.register(req, res, next));

export default router;