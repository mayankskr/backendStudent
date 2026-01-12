import dashboardService from "../services/dashboard.service.js";
import { asyncWrap } from "../utils/errorhandler.js";

export const dashboardController = asyncWrap(async (req, res) => {
  // 1. Get user id from JWT middleware
  const userId = req.user.id;

  // 2. Call service
  const result = await dashboardService(userId);

  // 3. Send response
  res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data: result
  });
});
