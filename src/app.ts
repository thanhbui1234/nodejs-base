import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import connectDB from "./config/database";
import cors from 'cors';

import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import uploadRouter from "./routes/upload";

const app: Application = express();
dotenv.config();

// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", uploadRouter);

export const viteNodeApp: Application = app;
