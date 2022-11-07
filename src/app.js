import express from "express";
import morgan from "morgan";
import productRouter from "./routes/product.route";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", productRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
