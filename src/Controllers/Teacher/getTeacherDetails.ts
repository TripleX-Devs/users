import type express from "express";
import prismaClient from "@/config/db";
import jwt from "jsonwebtoken";
const getTeacherDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        // const teacherId = req.params.id;
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };

        const teacherId=decoded.sub;
        
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