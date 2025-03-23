import { Request, Response, NextFunction } from "express";
import { registerSchema, RegisterSchema, StatusCode } from "../validation/auth-validation";
import { createUser } from "../services/user-services";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(StatusCode.BAD_REQUEST).json(validationResult.error);
    }

    const {fullName, email, password} = validationResult.data;

    const user = await createUser({fullName, email, password})

    const token = user.generateAuthToken();
     res.status(StatusCode.CREATED).json({token})
   } catch (error) {
    res.status(StatusCode.SERVER_ERROR).json(error)
   }
};