import express from "express";
import { get } from "../controllers/product";

const router = express.Router();

router.get("/categories", get);

export default router;
