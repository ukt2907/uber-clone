import mongoose from "mongoose";
import { string } from "zod";

interface IRide {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId; 
    captain: mongoose.Types.ObjectId;
    pickup: string;
    destination: string;
    fare: number;
    distance: number;
    duration: number;
    status: string;
    paymentId: string;
    orderId: string;
    signature: string;
    otp: string
}


const rideSchema = new mongoose.Schema<IRide>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "onGoing", "completed", "cancelled"],
        default: "pending",
    },
    distance: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select:false,
        required: true
        
    }
});

const Ride = mongoose.model<IRide>("Ride", rideSchema);

export default Ride;
