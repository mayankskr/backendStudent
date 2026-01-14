// controllers/editInfo.controller.js
import { editInfoService } from "../services/editInfo.service.js";
import { AppError } from "../utils/errorhandler.js";

export const editInfoController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return next(new AppError("Unauthorized", 401));

    const data = req.body;
    const file = req.file;

    const updatedUser = await editInfoService(userId, data, file);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
