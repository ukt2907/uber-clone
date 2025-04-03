import express from "express";
const router = express.Router();
import { authMiddleware } from "../middleware/auth-middleware";
import { query } from "express-validator";
import {getCoordinates,getDistanceTime, getSuggestions  } from "../controllers/map-controller";


router.get("/get-coordinates", authMiddleware, getCoordinates);

router.get("/get-distance-time",authMiddleware, getDistanceTime);

router.get("/get-suggestions",authMiddleware, getSuggestions);

export default router;
