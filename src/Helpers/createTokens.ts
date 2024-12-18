import jwt from "jsonwebtoken";

// TODO - Introduce an interface for userData & keep only name and universityEmail

export type JWT = {
    sub: string;
    rollType: string;
    userData?: {
        name: string;
        universityEmail: string;
    };
    iat?: Date; // Issued at - Date when the token was created
    exp?: Date; // Expiry date of the token
};



export const createToken = (payload: JWT) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
    });

    return token;
};

export const createRefreshToken = (payload : JWT) =>
{
    const token = jwt.sign(payload , process.env.JWT_REFRESH_TOKEN as string , {
        expiresIn : "7d"
    })
    return token;
}