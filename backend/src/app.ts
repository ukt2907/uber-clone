import express from "express"
import cors from "cors"
import { Request, Response } from "express"
const app = express();
import connectDB from "./db/db";

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

export default app