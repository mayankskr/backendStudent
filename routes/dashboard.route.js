import express from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/api/auth/dashboard", protect, dashboardController);

export default router;
