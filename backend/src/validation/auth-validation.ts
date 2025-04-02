import z from "zod";

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
    
})


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