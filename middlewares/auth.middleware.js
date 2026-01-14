// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorhandler.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized access", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // normalize different possible id keys in the token payload
    req.user = {
      id: decoded.id || decoded.userId || decoded._id || decoded.sub
    };
    return next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
