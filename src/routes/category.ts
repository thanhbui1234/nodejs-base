import express, { Router } from "express";
import { get } from "../controllers/product";

const router: Router = express.Router();

router.route("/categories", get);

export default router;
