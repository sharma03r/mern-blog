import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteUser,
  testUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/test", testUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
