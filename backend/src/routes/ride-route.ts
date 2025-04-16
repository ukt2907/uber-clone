import express from "express"
import { confirmRide, createRide, endRide, getFare, startRide } from "../controllers/ride-controller";
import { authMiddleware, captainMiddleware } from "../middleware/auth-middleware";
const router = express.Router();

router.post("/create", authMiddleware ,createRide);
router.get("/fare", authMiddleware, getFare)
router.post("/confirm", captainMiddleware, confirmRide)
router.get("/start-ride", captainMiddleware, startRide)
router.post("/end-ride", captainMiddleware, endRide)


export default router