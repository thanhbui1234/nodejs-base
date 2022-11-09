import express from "express";
import mongoose from "mongoose";

import morgan from "morgan";
import productRouter from "./routes/product.route";

const app = express();

mongoose
    .connect("mongodb://localhost:27017/we17201")
    .then(() => console.log("Ket noi db thanh cong"))
    .catch((error) => console.log("Ket noi db khong thanh cong", error));

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", productRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
