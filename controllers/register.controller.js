// Import
import { asyncWrap } from "../utils/errorhandler.js";
import registerService from "../services/register.service.js";

/**
 * Export register controller
 * It will have two parameters:
 * - req
 * - res
 * Extract form data from req.body
 * Pass the data in registerService
 * Send response to client
 */
export const registerController = asyncWrap(async (req, res) => {

  // 1. Get data from request body
  const userData = req.body;

  // 2. Call service layer
  const result = await registerService(userData);
  
  // 3. Send response to client
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  });
});
