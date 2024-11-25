import type express from "express";

export const checkRollNumber = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const { rollNo } = req.params;
    if (req.user && req.user.sub === rollNo) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Roll number does not match" });
    }
};