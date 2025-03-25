import express from "express"
import cors from "cors"
const app = express();
import userRoutes from "./routes/user-route";
import connectDB from "./db/db";
import cookieParser from "cookie-parser"

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes)

export default app