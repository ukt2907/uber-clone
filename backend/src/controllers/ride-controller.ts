    import { Server } from "socket.io";
import { CaptainRequest, UserRequest } from "../middleware/auth-middleware";
import { Captain } from "../models/captain-model";
    import { getAddressCoordinates, getCaptainInTheRadius } from "../services/maps-services";
    import { confirmRideService, createRideService, endRideService, getFareForRide, startRideService } from "../services/ride-services";
import { sendMessageToSocketId } from "../socket";
    import {  fareSchema, rideRequestSchema, StatusCode } from "../validation/auth-validation"
    import { Response } from "express"
import { getSocketInstance } from "../socket-instance";
import Ride from "../models/ride-model";
import { send } from "process";



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
            const ride = await confirmRideService(rideId, { _id: req.captain._id.toString() });
    
    
            if (!ride.userId) {
                console.log("No userId found for ride:", rideId);
                res.status(StatusCode.BAD_REQUEST).json({
                    message: "User not found for this ride",
                });
                return;
            }
    
    
            const userSocketId = (ride.userId as any).socketId;
            if (userSocketId) {
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


    export const startRide = async (req: CaptainRequest, res: Response): Promise<void> => {
        const { rideId, otp } = req.query;

        if (!rideId || !otp) {
            console.log("Missing rideId or OTP in request body");
            res.status(StatusCode.BAD_REQUEST).json({
                message: "RideId and OTP are required",
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
            const ride = await startRideService(rideId as string, otp as string, req.captain._id.toString());

            const populatedRide = await Ride.findById(ride._id).populate("captain").populate("userId");
    

            sendMessageToSocketId((populatedRide?.userId as any).socketId, {
                event: "ride-started",
                data: populatedRide,
            });
    
            res.status(StatusCode.CREATED).json({
                message: "Ride started successfully",
                ride,
            });
        } catch (error: any) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: error.message || "Error in starting ride",
            });
            return;
        }
    };

    export const endRide = async (req: CaptainRequest, res: Response): Promise<void> => {

        const { rideId } = req.body;

        try{
            if (!req.captain?._id) {
                throw new Error("Captain ID is undefined");
            }
            const ride = await endRideService(rideId as string, req.captain._id.toString());

            sendMessageToSocketId((ride.userId as any).socketId, {
                event: "ride-ended", 
                data: ride,
            });

            res.status(StatusCode.CREATED).json({
                message: "Ride ended successfully",
                ride,
            });

        }catch(error){
            console.log("Error in ending ride:", error);
            res.status(StatusCode.BAD_REQUEST).json({
                message: "Error in ending ride"
            })
            return;
        }
    }