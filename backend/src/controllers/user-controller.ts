
import BlacklistToken from "../models/blacklist-token";
import { User } from "../models/user-model";
import { createUser } from "../services/user-services";
import { UserRequest } from "../middleware/auth-middleware";
import {  loginSchema, registerSchema, StatusCode } from "../validation/auth-validation";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validationResult = registerSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: validationResult.error.issues[0].message
            });
            return;
        }

        const { fullName, email, password } = validationResult.data;
        
        const userAlreadyExists = await User.findOne({ email });

        if(userAlreadyExists) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: "User already exists"
            })
        }

        const user = await createUser({ fullName, email, password });
        const userWithoutPassword = user.toObject() as {password?: string};
        delete userWithoutPassword.password;
        const token = user.generateAuthToken();

        res.status(StatusCode.CREATED).json({
            message: "User created successfully",
            token,
            userWithoutPassword
        });
    } catch (error) {

        res.status(StatusCode.SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
};

export const loginUser = async (req: UserRequest, res: Response): Promise<void> => {
    const validationResult = loginSchema.safeParse(req.body);

    if(!validationResult.success) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: validationResult.error.issues[0].message
        });
        return;
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        res.status(StatusCode.BAD_REQUEST).json({
            message: "User not found"
        })
        return
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: "Invalid credentials"
        })
        
    }
    const userWithoutPassword = user.toObject() as {password?: string};
    delete userWithoutPassword.password;

    const token = user.generateAuthToken();

    res.cookie("token", token)

     res.status(StatusCode.SUCCESS).json({
        message: "Login successful",
        token,
        userWithoutPassword
    });
    
}

export const getUserProfile = async (req: UserRequest, res: Response) => {

     res.status(StatusCode.SUCCESS).json(req.user);
     return;
}


export const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 
    await BlacklistToken.create({ token });
    res.status(StatusCode.SUCCESS).json({
        message: "Logged out successfully"
    });
}
