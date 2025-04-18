import Ride from "../models/ride-model";
import { RideRequestSchema } from "../validation/auth-validation";
import { getDistanceTimeService } from "./maps-services"
import { string } from 'zod';
import { startRide, endRide } from '../controllers/ride-controller';
import { sendMessageToSocketId } from "../socket";


export async function getFareForRide(pickup:string, destination:string) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTimeService(pickup, destination)

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    };
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinuteRate.bike))
    };

    return fare;


}


function getOtp(num: number) {
    function generateOtp(num: number) {
        const min = Math.pow(10, num - 1);
        const max = Math.pow(10, num) - 1;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        return otp.toString();
    }
    return generateOtp(num);
}


export const createRideService = async (data: RideRequestSchema) => {
    const { userId, destination, pickup, vehicleType } = data;

    if (!userId || !destination || !pickup || !vehicleType ) {
        throw new Error("All fields are required");
    }

    const fare = await getFareForRide(pickup, destination);

    const ride = await Ride.create({
        userId,
        destination,
        pickup,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
}


export const confirmRideService = async (rideId: string, captain: { _id: string }) => {
    if (!rideId) {
        console.log("No rideId provided");
        throw new Error("RideId is required");
    }

    if (!captain || !captain._id) {
        console.log("No captainId provided");
        throw new Error("CaptainId is required");
    }


    // Update ride status and assign captain
    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        { status: "accepted", captain: captain._id },
        { new: true } // Return updated document
    );

    if (!updatedRide) {
        console.log("Ride not found for rideId:", rideId);
        throw new Error("Ride not found");
    }


    // Populate userId and captain
    const ride = await Ride.findById(rideId).populate({ path: "userId", select: "socketId" }).populate("captain").select("+otp");



    if (!ride) {
        console.log("Populated ride not found for rideId:", rideId);
        throw new Error("Ride not found after update");
    }

    console.log("Confirmed ride:", ride);

    return ride;
};



export const startRideService = async (rideId: string, otp: string, captain: any) => {
    if (!rideId || !otp) {
        console.log("Missing rideId or otp:", { rideId, otp });
        throw new Error("RideId and OTP are required");
    }


    const ride = await Ride.findById(rideId)
        .populate("userId")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "accepted") {
        throw new Error("Ride is not accepted yet");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    await Ride.findOneAndUpdate({
        _id: rideId,
    },{
        status: "onGoing"
    })
    
    return ride;
};


export const endRideService = async (rideId:string, captain:any) => {
    if(!rideId || !captain) {
        console.log("Missing rideId or captain:", { rideId, captain });
        throw new Error("RideId and captain are required");
    }

    const ride = await Ride.findById({
        _id: rideId,
        captain: captain._id
    }).populate("userId").populate("captain").select("+otp");

    if (!ride) {
        throw new Error("Ride not found or captain not assigned to this ride");
    }

    if(ride?.status !== "onGoing") {
        throw new Error("Ride is not onGoing");
    }
     await Ride.findOneAndUpdate({
        _id: rideId,
     }, {
        status: "completed"
     })

     return ride;
}
