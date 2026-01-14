// controllers/me.controller.js
import User from "../models/user.model.js";
import { AppError } from "../utils/errorhandler.js";

export const getMeController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return next(new AppError("Unauthorized", 401));

    const user = await User.findById(userId).select("-passwordHash");
    if (!user) return next(new AppError("User not found", 404));

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};
