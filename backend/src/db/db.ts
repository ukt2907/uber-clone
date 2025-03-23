import mongoose from "mongoose";
import config from "../config/config";

function connectDB() {
    mongoose
        .connect(config.MONGO_URL || "")
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log(err));
}

export default connectDB;