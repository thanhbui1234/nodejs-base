import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import connectDB from "./config/database";

import productRouter from "./routes/product";
import authRouter from "./routes/auth";

const app = express();
dotenv.config();

// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", productRouter);
app.use("/api", authRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8080");
});
