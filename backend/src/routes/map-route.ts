import express from "express";
const router = express.Router();
import { authMiddleware } from "../middleware/auth-middleware";
import { query } from "express-validator";
import {getCoordinates,getDistanceTime, getSuggestions  } from "../controllers/map-controller";


router.get("/get-coordinates", 
    query("address").isString().isLength({min: 3}),
    authMiddleware, getCoordinates);

router.get("/get-distance-time",
    query("origin").isString().isLength({min: 3}),
    query("destination").isString().isLength({min: 3}),
    authMiddleware, getDistanceTime);

router.get("/get-suggestions",
    query("input").isString().isLength({min: 3}),
    authMiddleware, getSuggestions);

export default router;
