    import { Server } from "socket.io";
import { UserRequest } from "../middleware/auth-middleware";
import { Captain } from "../models/captain-model";
    import { getAddressCoordinates, getCaptainInTheRadius } from "../services/maps-services";
    import { createRideService, getFareForRide } from "../services/ride-services";
import { sendMessageToSocketId } from "../socket";
    import {  fareSchema, rideRequestSchema, StatusCode } from "../validation/auth-validation"
    import { Response } from "express"
import { getSocketInstance } from "../socket-instance";



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
        
            
            const pickupCoordinates = await getAddressCoordinates(pickup);
                        
            const captainsInRadius = await getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10)

            
            
            ride.otp = ""

            const io = getSocketInstance();

            captainsInRadius.forEach((captain) => {
                console.log(captain + "captain", ride + "ride");
                if (captain.socketId) {
                    // Corrected call to sendMessageToSocketId
                    sendMessageToSocketId(io, captain.socketId, {
                        event: "new-ride",
                        data: ride,
                    });
                }
            });

            res.status(StatusCode.CREATED).json({
                message: "Ride created Successfully",
                ride,
                captainsInRadius
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