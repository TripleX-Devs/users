import type express from "express";
import prismaClient from "@/config/db";

const getTeacherDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const teacherId = req.params.id;
       
        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        if (!teacherData) {
            throw new Error("Teacher not found");
        }

        return res
            .status(200)
            .json({ message: "Teacher details", data: teacherData });
    } catch (err) {
        next(err);
    }
};

export default getTeacherDetails;