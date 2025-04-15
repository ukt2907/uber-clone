import express from "express"
import { confirmRide, createRide, getFare } from "../controllers/ride-controller";
import { authMiddleware, captainMiddleware } from "../middleware/auth-middleware";
const router = express.Router();

router.post("/create", authMiddleware ,createRide);
router.get("/fare", authMiddleware, getFare)
router.post("/confirm", captainMiddleware, confirmRide)


export default router