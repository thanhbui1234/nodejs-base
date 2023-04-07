import express, { Router } from "express";
import { create, get, getAll, remove, restore, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkAuth";

const router: Router = express.Router();
router.get('/products', getAll);
router.get("/products/:id", get);
router.post("/products/:id", get);
router.patch("/products/:id", checkPermission, restore)
router.put("/products/:id", checkPermission, update)
router.delete("/products/:id", checkPermission, remove)

export default router;