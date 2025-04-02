import express from "express"
import { createRide } from "../controllers/ride-controller";
import { authMiddleware } from "../middleware/auth-middleware";
const router = express.Router();

router.post("/create", authMiddleware ,createRide);


export default router