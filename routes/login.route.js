import { loginController } from "../controllers/login.controller.js";
import express from "express"

const router = express.Router()

router.post("/api/auth/login", loginController);

export default router;