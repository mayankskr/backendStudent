import User from "../models/user.model.js";
import { AppError } from "../utils/errorhandler.js";

const dashboardService = async (userId) => {
  // 1. Find user by ID
  const user = await User.findById(userId).select("-passwordHash");

  // 2. If user not found
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 3. Return user data
  return user;
};

export default dashboardService;
