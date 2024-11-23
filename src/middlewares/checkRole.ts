import type express from "express";

export const checkRole = (role: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.user && req.user.rollType === role) {
            next();
        } else {
            return res.status(403).json({ message: "Unauthorised" });
        }
    };
};