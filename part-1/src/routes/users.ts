import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/", userController.insert_user);
router.get("/", userController.get_users);
router.get("/:id", userController.get_user_by_id);
router.put("/:id", userController.update_user);
router.delete("/:id", userController.delete_user);

export default router;
