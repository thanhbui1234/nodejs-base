import express from "express";
import { add, get, remove, restore, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", get);
router.get("/products/:id", get);
router.post("/products/", add);
router.patch("/products/:id", restore);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, remove);

export default router;
