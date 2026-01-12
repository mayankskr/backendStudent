import loginService from "../services/login.service.js";
import { asyncWrap } from "../utils/errorhandler.js";

export const loginController = asyncWrap(async (req, res) => {
  // 1. Get data from the request body
  const data = req.body;

  // 2. Call login service
  const result = await loginService(data);

  // 3. Send response
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  });
});
