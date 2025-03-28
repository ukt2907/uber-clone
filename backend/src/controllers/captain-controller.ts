import { Request, Response } from 'express';
import { captainLoginSchema, captainRegisterSchema, StatusCode } from '../validation/auth-validation';
import { createCaptain } from '../services/captain-services';
import { Captain } from '../models/captain-model';
import { AuthRequest } from '../middleware/auth-middleware';
import BlacklistToken from '../models/blacklist-token';


export const registerCaptain = async (req: Request, res: Response):Promise<void> => {
    const validationResult = captainRegisterSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: validationResult.error.issues[0].message
        });
      return;  
    }
    const { fullName, email, password, vehicle } = validationResult.data;

    const captainAlreadyExists = await Captain.findOne({email});
    if(captainAlreadyExists){
        res.status(StatusCode.BAD_REQUEST).json({
            message: "Captain already exists"
        });
        return;
    }

    const captain = await createCaptain({fullName, email, password, vehicle});
    const token = captain.generateAuthToken();

     res.status(StatusCode.CREATED).json({
        message: "Captain created successfully",
        captain,
        token
    });
}

export const loginCaptain = async (req: Request, res: Response):Promise<void> => {
    const validationResult = captainLoginSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: validationResult.error.issues[0].message
        });
      return;  
    }
    const { email, password } = validationResult.data;

    const captain = await Captain.findOne({email}).select("+password");

    if(!captain){
        res.status(StatusCode.NOT_FOUND).json({
            message: "Captain not found"
        });
        return;
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Invalid credentials"
        });
        return;
    }

    const token = captain.generateAuthToken();

    res.status(StatusCode.SUCCESS).json({
        message: "Captain logged in successfully",
        captain,
        token
    });
}

export const getCaptainProfile = async (req: AuthRequest, res: Response):Promise<void> => {
    res.status(StatusCode.SUCCESS).json({
        message: "Captain profile",
        captain: req.captain
    });
}

export const logoutCaptain = async (req: Request, res: Response):Promise<void> => {
    res.clearCookie("token");   


    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({token});

    res.status(StatusCode.SUCCESS).json({
        message: "Captain logged out successfully"
    });
}