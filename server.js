import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import loginRoute from "./routes/login.route.js";
import registerRoute from "./routes/register.route.js";
import dashboardRoute from "./routes/dashboard.route.js";

// Utils
import { AppError } from "./utils/errorhandler.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.use(registerRoute);
app.use(loginRoute);
app.use(dashboardRoute);


/* =========================
   TEST ROUTE
========================= */
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running correctly"
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.status).json({
    success: false,
    message: err.message
  });
});

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

/* =========================
   SERVER LISTEN
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
