import express from "express";
import { add, get, remove, update } from "../controllers/product.controller";
import { checkPermission } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", get);
router.get("/products/:id", get);
router.post("/products/", add);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, remove);

export default router;
