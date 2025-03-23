import { User } from "../models/user-model";
import { RegisterSchema } from "../validation/auth-validation";

export const createUser = async (data: RegisterSchema)=>{
    const {fullName, email, password} = data;

    const user = await User.create({fullName, email, password})
    return user
}