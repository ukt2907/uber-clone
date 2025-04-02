import mongoose from "mongoose";

interface IRide {
    userId: mongoose.Types.ObjectId;
    captainId: mongoose.Types.ObjectId;   
    pickup: string;
    destination: string;
    fare: number;
    distance: number;
    duration: number;
    status: string;
    paymentId: string;
    orderId: string;
    signature: string;
}


const rideSchema = new mongoose.Schema<IRide>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
        required: true,
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
});

const Ride = mongoose.model<IRide>("Ride", rideSchema);

export default Ride;
