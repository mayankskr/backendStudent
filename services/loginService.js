import User from "../models/user.js";
import { AppError } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }) => {
  // 1. Validate input
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // 2. Find user
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Check if user is active
  if (!user.isActive) {
    throw new AppError("User account is deactivated", 403);
  }

  // 4. Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // 5. Update login metadata
  user.lastLoginAt = new Date();
  user.loginCount += 1;
  await user.save();

  // 6. Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 7. Return safe response
  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      overallProgress: user.overallProgress
    }
  };
};
