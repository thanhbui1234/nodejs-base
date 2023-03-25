import express, { Router } from "express";
import { signin, signup } from "../controllers/auth";

const router: Router = express.Router();
router.route("/")
    .post(signup)
    .post(signin);
export default router;
