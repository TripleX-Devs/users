import type express from "express";

import { validateToken } from "@/Helpers/validateToken";

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
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        next(err);
    }
};
