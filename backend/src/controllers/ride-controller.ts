    import { Server } from "socket.io";
import { CaptainRequest, UserRequest } from "../middleware/auth-middleware";
import { Captain } from "../models/captain-model";
    import { getAddressCoordinates, getCaptainInTheRadius } from "../services/maps-services";
    import { confirmRideService, createRideService, getFareForRide } from "../services/ride-services";
import { sendMessageToSocketId } from "../socket";
    import {  fareSchema, rideRequestSchema, StatusCode } from "../validation/auth-validation"
    import { Response } from "express"
import { getSocketInstance } from "../socket-instance";
import Ride from "../models/ride-model";



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

            const rideWithUser = await Ride.findById(ride._id).populate("userId")  
            console.log("Ride with user:", rideWithUser);


            captainsInRadius.forEach((captain) => {
                if (captain.socketId) {
                    // Corrected call to sendMessageToSocketId
                    sendMessageToSocketId(captain.socketId, {
                        event: "new-ride",
                        data: rideWithUser,
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

    export const confirmRide = async (req: CaptainRequest, res: Response): Promise<void> => {
        const { rideId } = req.body;
        if (!rideId) {
            console.log("No rideId in request body");
            res.status(StatusCode.BAD_REQUEST).json({
                message: "RideId is required",
            });
            return;
        }
        if (!req.captain) {
            console.log("No captain in request");
            res.status(StatusCode.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }
    
        try {
            console.log("Confirming ride for captain:", req.captain._id, "rideId:", rideId);
            const ride = await confirmRideService(rideId, { _id: req.captain._id.toString() });
    
            console.log("Ride from confirmRideService:", ride);
    
            if (!ride.userId) {
                console.log("No userId found for ride:", rideId);
                res.status(StatusCode.BAD_REQUEST).json({
                    message: "User not found for this ride",
                });
                return;
            }
    
    
            const userSocketId = (ride.userId as any).socketId;
            if (userSocketId) {
                console.log("Sending ride-confirmed to user socket:", userSocketId, "with ride:", ride);
                sendMessageToSocketId( userSocketId, {
                    event: "ride-confirmed",
                    data: ride,
                });
            } else {
                console.log("No socketId found for user:", ride.userId);
            }
    
            res.status(StatusCode.CREATED).json({
                message: "Ride confirmed successfully",
                ride,
            });
        } catch (error: any) {
            console.error("Confirm ride error:", error.message, "rideId:", rideId);
            res.status(StatusCode.BAD_REQUEST).json({
                message: error.message || "Error in confirming ride",
            });
            return;
        }
    };