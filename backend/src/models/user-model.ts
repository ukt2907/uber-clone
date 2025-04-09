import mongoose from "mongoose";
import config from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IFullName {
    firstName: string;
    lastName: string;
}

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: IFullName;
    email: string;
    password: string;
    socketId: string;
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.JWT_SECRET || "");
    return token;
}



userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}




export const User = mongoose.model<IUser>("User", userSchema);