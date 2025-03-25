import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware , getUserProfile);
router.get("/logout",authMiddleware , logoutUser);


export default router;