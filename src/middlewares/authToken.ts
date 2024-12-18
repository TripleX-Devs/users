import type express from "express";
import jwt from "jsonwebtoken";
import { validateToken } from "@/Helpers/validateToken";

// express.d.ts
import { User } from "@/Helpers/userInterface";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

// This is necessary to make the file a module and avoid TypeScript errors
export {};

export const checkForAccessToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };
            console.log(decodedToken)
            if (decodedToken) {
                req.user = decodedToken; // Attach the decoded token to the request object
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        
    } catch (err) {
        next(err);
    }
};