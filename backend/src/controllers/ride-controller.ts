import { error } from "console";
import { UserRequest } from "../middleware/auth-middleware";
import { createRideService } from "../services/ride-services";
import {  rideRequestSchema, StatusCode } from "../validation/auth-validation"
import { Response } from "express"



export const createRide = async (req: UserRequest, res: Response):Promise<void>=>{
    
    if (!req.user) {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        });
        return;
    }
    
    const validationResult = rideRequestSchema.safeParse({
        ...req.body,
        userId: req.user._id.toString()
    });

    if(!validationResult.success){
        res.status(StatusCode.BAD_REQUEST).json({   
            message: "Validation Error"
        })
        return
    }
    const {destination, pickup, vehicleType}= validationResult.data

    if(!req.user){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        return;
    }

    const ride = await createRideService({
        userId : req.user._id.toString(),
        destination,
        pickup,
        vehicleType,
    })

    res.status(StatusCode.CREATED).json({
        message: "Ride created Successfully",
        ride
    })
}