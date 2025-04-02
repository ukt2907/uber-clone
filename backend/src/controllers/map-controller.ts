import { Request, Response } from "express";
import { StatusCode } from "../validation/auth-validation";
import { validationResult } from "express-validator";
import { getAddressCoordinates, getDistanceTimeService, getSuggestionsService } from "../services/maps-services";

export const getCoordinates = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCode.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinates(address as string);
        res.status(StatusCode.SUCCESS).json(coordinates);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching address coordinates" });
    }
};

export const getDistanceTime = async (req: Request, res: Response) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(StatusCode.BAD_REQUEST).json({ errors: errors.array() });
            return;
        }
        const { origin, destination } = req.query;

    try {
        const distance = await getDistanceTimeService(origin as any, destination as any);
        res.status(StatusCode.SUCCESS).json(distance);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching distance and time" });
    }    
}

export const getSuggestions = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCode.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    const { input } = req.query;
    try {
        const suggestions = await getSuggestionsService(input as string);
        res.status(StatusCode.SUCCESS).json(suggestions);
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Error fetching suggestions" });
    }
}