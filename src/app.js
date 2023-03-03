import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import productRouter from "./routes/product";
import authRouter from "./routes/auth";

const app = express();

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Mô tả Ví dụ về API Document",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js", "./controllers/*.js", "./models/*.js"],
};
// Ket noi db
mongoose
    .connect("mongodb://localhost:27017/new")
    .then(() => console.log("Ket noi db thanh cong"))
    .catch((error) => console.log("Ket noi db khong thanh cong", error));

const specs = swaggerJSDoc(options);
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", productRouter);
app.use("/api", authRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
