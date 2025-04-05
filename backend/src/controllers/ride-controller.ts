import { UserRequest } from "../middleware/auth-middleware";
import { createRideService, getFareForRide } from "../services/ride-services";
import {  fareSchema, rideRequestSchema, StatusCode } from "../validation/auth-validation"
import { Response } from "express"



export const createRide = async (req: UserRequest, res: Response):Promise<void>=>{
    if(!req.user){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
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


    try {
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
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: "Error in creating ride"
        })
        return;
        
    }
}

export const getFare = async (req: UserRequest, res: Response):Promise<void>=>{
    if(!req.user){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        return;
    }
    const validationResult = fareSchema.safeParse(req.query);

    if(!validationResult.success){
        res.status(StatusCode.BAD_REQUEST).json({   
            message: "Validation Error"
        })
        return
    }
    const {pickup, destination} = validationResult.data


    try {
        const fare = await getFareForRide(pickup, destination)
        res.status(StatusCode.CREATED).json({
            message: "Fare fetched Successfully",
            fare
        })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: "Error in getting fare"
        })
        return;
    }
}