import type express from "express";

export const checkIdAdmin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const { id } = req.params;
    if (req.user && req.user.sub===id) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
};