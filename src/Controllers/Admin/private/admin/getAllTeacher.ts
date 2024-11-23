import type express from "express";
import prismaClient from "@/config/db";

const getAllTeachers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const teachersData = await prismaClient.teacher.findMany();

        if (!teachersData || teachersData.length === 0) {
            throw new Error("No teachers found");
        }

        return res
            .status(200)
            .json({ message: "All teachers data", data: teachersData });
    } catch (err) {
        next(err);
    }
};

export default getAllTeachers;