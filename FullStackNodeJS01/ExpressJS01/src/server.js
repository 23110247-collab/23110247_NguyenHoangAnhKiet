import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";
import sequelize, { connectDB } from "./config/database.js";
import "./models/user.js";       // đăng ký model trước khi sync
import "./models/otp.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);

// Kết nối DB + sync bảng, sau đó mới lắng nghe request
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  });
});