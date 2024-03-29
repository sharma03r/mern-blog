import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Conntected to the mongo");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });
app.use(cookieParser());
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: "false",
    statusCode,
    message,
  });
});
