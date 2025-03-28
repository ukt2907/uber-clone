import {NextFunction, Request, Response} from "express"
import { StatusCode } from "../validation/auth-validation";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { IUser, User } from "../models/user-model";
import BlacklistToken from "../models/blacklist-token";
import { Captain, ICaptain } from "../models/captain-model";

interface AuthRequest extends Request {
    user?: IUser;
    captain?: ICaptain;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];   


    if(!token) {
         res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        return;
    }

    const isBlacklisted = await BlacklistToken.findOne({token});

    if(isBlacklisted){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        
    }
    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET || "") as {_id: string};
        const user = await User.findById(decoded._id);

        if(!user) {
             res.status(StatusCode.UNAUTHORIZED).json({
                message: "Unauthorized"
            })
            return;
        }
        req.user = user; 
        next(); 
    } catch (error) {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
    }
}


export const captainMiddleware = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];   

    if(!token) {
         res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        return;
    }

    const isBlacklisted = await BlacklistToken.findOne({token});

    if(isBlacklisted){
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
        return;
    }
    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET || "") as {_id: string};
        const captain = await Captain.findById(decoded._id);

        if(!captain) {
             res.status(StatusCode.UNAUTHORIZED).json({
                message: "Unauthorized"
            })
            return;
        }
        req.captain = captain;
        next(); 
    } catch (error) {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Unauthorized"
        })
    }
}

export {AuthRequest}
