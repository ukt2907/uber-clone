import z from "zod";
import { Request } from "express";
import { IUser } from "../models/user-model";
import { ICaptain } from "../models/captain-model";






export const registerSchema = z.object({
    fullName:z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3)
    }),
    email: z.string().email(),
    password: z.string().min(3)
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})

export const captainRegisterSchema = z.object({
    fullName:z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3)
    }),
    email: z.string().email(),
    password: z.string().min(3),
    vehicle: z.object({
        color: z.string(),
        plate: z.string(),
        capacity: z.number().min(1),
        vehicleType: z.string(),
        location: z.object({
            ltd: z.number(),
            lng: z.number()
        }).optional()
    })
});

export const captainLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})

export const rideRequestSchema = z.object({
    userId:z.string(),
    pickup:z.string(),
    destination:z.string(),
    vehicleType: z.enum(["auto", "bike", "car"]),
})

export const fareSchema = z.object({
    pickup: z.string().min(1, "Pickup location is required"),
    destination: z.string().min(1, "Destination is required"),
});


export const coordinatesSchema = z.object({
  address: z.string().min(1, "Address is required")
});

export const distanceTimeSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required")
});

export const suggestionsSchema = z.object({
  input: z.string().min(1, "Input query is required")
});

export type CoordinatesSchema = z.infer<typeof coordinatesSchema>;
export type DistanceTimeSchema = z.infer<typeof distanceTimeSchema>;
export type SuggestionsSchema = z.infer<typeof suggestionsSchema>;
export type FareSchema = z.infer<typeof fareSchema>;




// // Define the Zod schema for validation
// const rideSchema = z.object({
//     userId: z.string().nonempty("User ID is required"),
//     captainId: z.string().nonempty("Captain ID is required"),
//     pickup: z.string().nonempty("Pickup location is required"),
//     destination: z.string().nonempty("Destination is required"),
//     fare: z.number().positive("Fare must be a positive number"),
//     distance: z.number().optional(),
//     duration: z.number().optional(),
//     status: z.enum(["pending", "accepted", "onGoing", "completed", "cancelled"]),
//     paymentId: z.string().optional(),
//     orderId: z.string().optional(),
//     signature: z.string().optional(),
//     otp: z.string().nonempty("OTP is required")
// });





export enum StatusCode {
    BAD_REQUEST = 400,
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    CREATED=201
}


export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type CaptainRegisterSchema = z.infer<typeof captainRegisterSchema>
export type CaptainLoginSchema = z.infer<typeof captainLoginSchema>
export type RideRequestSchema = z.infer<typeof rideRequestSchema>