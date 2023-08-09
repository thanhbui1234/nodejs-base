import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import connectDB from "./config/database";
import cors from 'cors';

import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import uploadRouter from "./routes/upload";
import swaggerDocs from "./utils/swagger";

const app: Express = express();

dotenv.config();

// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(process.env.MONGO_URI as string);

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", uploadRouter);

swaggerDocs(app, 3000);

export const viteNodeApp: Express = app;
