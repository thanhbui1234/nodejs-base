import express from "express";
import productRouter from "./routes/product.route";

const app = express();

app.use(express.json());

app.use("/api", productRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
