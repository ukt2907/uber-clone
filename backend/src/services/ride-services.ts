import Ride from "../models/ride-model";
import { RideRequestSchema } from "../validation/auth-validation";
import { getDistanceTimeService } from "./maps-services"


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

    if (!userId || !destination || !pickup || !vehicleType) {
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

