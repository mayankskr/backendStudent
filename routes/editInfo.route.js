// routes/editInfo.route.js
import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { editInfoController } from "../controllers/editInfo.controller.js";

const router = express.Router();

router.put(
  "/api/auth/edit-profile",
  protect,
  upload.single("avatar"),
  editInfoController
);

export default router;
