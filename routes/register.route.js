import express from "express"
import { registerController } from "../controllers/register.controller.js";

const router = express.Router();

router.post("/api/auth/register", registerController);

export default router;