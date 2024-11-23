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
    const token = req.cookies.token;
  
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const isValidToken = await validateToken(token);
        if (isValidToken) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };
            if (decodedToken) {
                req.user = decodedToken; // Attach the decoded token to the request object
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        next(err);
    }
};
