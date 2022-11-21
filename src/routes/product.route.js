import express from "express";
import { add, list, read, remove, update } from "../controllers/product.controller";
import { userById } from "../controllers/user";
import { requireSignin } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", list);
router.get("/products/:id", read);
router.post("/products/:userId", requireSignin, add);
router.put("/products/:id", update);
router.delete("/products/:id", remove);

router.param("userId", userById);

export default router;
