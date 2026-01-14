// routes/me.route.js
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getMeController } from "../controllers/me.controller.js";

const router = express.Router();

router.get("/api/auth/me", protect, getMeController);

export default router;
