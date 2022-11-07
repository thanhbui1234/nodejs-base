import express from "express";
import { add, list, read, remove, update } from "../controllers/product.controller";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", list);
router.get("/products/:id", read);
router.post("/products", add);
router.put("/products/:id/:userId", checkAuth, update);
router.delete("/products/:id", remove);

export default router;
