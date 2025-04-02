import express from "express"
import cors from "cors"
const app = express();
import userRoutes from "./routes/user-route";
import captainRoutes from "./routes/captain-route";
import connectDB from "./db/db";
import cookieParser from "cookie-parser"
import mapRoutes from "./routes/map-route";
import rideRoute from "./routes/ride-route"

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes)
app.use("/captain", captainRoutes)
app.use("/map", mapRoutes)
app.use("/ride", rideRoute)
export default app