import { Request, Response } from "express";
import { coordinatesSchema, distanceTimeSchema, StatusCode, suggestionsSchema } from "../validation/auth-validation";
import { validationResult } from "express-validator";
import { getAddressCoordinates, getDistanceTimeService, getSuggestionsService } from "../services/maps-services";

export const getCoordinates = async (req: Request, res: Response) => {
    const validationResult = coordinatesSchema.safeParse(req.query);

    if(!validationResult.success){
        res.status(StatusCode.BAD_REQUEST).json({
            message:"Validation Error"
        })
        return
    }
    
    const {address} = validationResult.data
    try {
        const coordinates = await getAddressCoordinates(address as string);
        res.status(StatusCode.SUCCESS).json(coordinates);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching address coordinates" });
    }
};

export const getDistanceTime = async (req: Request, res: Response) => {
    const validationResult = distanceTimeSchema.safeParse(req.query);

    if(!validationResult.success){
        res.status(StatusCode.BAD_REQUEST).json({
            message:"Validation Error"
        })
        return
    }

    const {origin, destination} = validationResult.data

    try {
        const distance = await getDistanceTimeService(origin as string, destination as string);
        res.status(StatusCode.SUCCESS).json(distance);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching distance and time" });
    }    
}

export const getSuggestions = async (req: Request, res: Response) => {
    const validationResult = suggestionsSchema.safeParse(req.query);

    if(!validationResult.success){
        res.status(StatusCode.BAD_REQUEST).json({
            message:"Validation Error"
        })
        return
    }

    const {input} = validationResult.data
    try {
        const suggestions = await getSuggestionsService(input as string);
        res.status(StatusCode.SUCCESS).json(suggestions);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching suggestions" });
    }
}