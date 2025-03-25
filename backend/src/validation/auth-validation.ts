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