import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';


export interface ICaptain extends Document {
    fullName: {
        firstName: string;
        lastName: string;
    },
    email: string;
    password: string;
    socketId?: string;
    status: string;
    vehicle: {
        color: string;
        plate: string;
        capacity: number;
        vehicleType: string;
        location?: {
            ltd: number;
            lng: number;
        };
    };
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

const captainSchema = new mongoose.Schema<ICaptain>({
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
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },
    vehicle: {
        color:{
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        },
        location: {
            ltd: {
                type: Number,
            },
            lng: {
                type: Number,
            }
        }
    }
});


captainSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.JWT_SECRET || "");
    return token;
}

captainSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

export const Captain = mongoose.model<ICaptain>("Captain", captainSchema);