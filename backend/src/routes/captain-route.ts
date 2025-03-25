import express from 'express';
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain-controller';
import { captainMiddleware } from '../middleware/auth-middleware';
const router = express.Router();

router.post("/register", registerCaptain)
router.post("/login", loginCaptain);
router.get("/profile", captainMiddleware ,getCaptainProfile);
router.get("/logout", captainMiddleware,logoutCaptain);

export default router;