import express from "express"
import { createRide, getFare } from "../controllers/ride-controller";
import { authMiddleware } from "../middleware/auth-middleware";
const router = express.Router();

router.post("/create", authMiddleware ,createRide);
router.get("/fare", authMiddleware, getFare)


export default router