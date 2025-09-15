import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/", userController.insert_user);

export default router;
