import { Captain } from "../models/captain-model";
import { CaptainRegisterSchema } from "../validation/auth-validation";

export const createCaptain = async (data: CaptainRegisterSchema) => {
    const { fullName, email, password, vehicle } = data;

    if(!fullName || !email || !password || !vehicle) {
        throw new Error("All fields are required");
    }

    const captain = await Captain.create({
        fullName,
        email,
        password,
        vehicle
    })

    return captain;

}

