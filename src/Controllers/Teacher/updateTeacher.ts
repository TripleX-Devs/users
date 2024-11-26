import prismaClient from "@/config/db";
import type express from "express";
import ResponsePayload from "@/utils/resGenerator";
import jwt from "jsonwebtoken";
const updateTeacher = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const resPayload = new ResponsePayload();
    try {
        const teacherUpdateData = req.body;
        
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            sub: string;
            rollType: string;
            userData: { name: string; universityEmail: string };
        };

        const teacherId = decoded.sub;

        if (!teacherId) {
            resPayload.setError("Teacher id is required");
            return res.status(400).json(resPayload);
        }
        if (!teacherUpdateData || Object.keys(teacherUpdateData).length === 0) {
            resPayload.setError("Update data is required");
            return res.status(400).json(resPayload);
        }
        const teacherData = await prismaClient.teacher.findFirst({
            where: {
                id: teacherId,
            },
        });

        if (!teacherData) {
            resPayload.setError("Teacher not found");
            return res.status(404).json(resPayload);
        }

        const updateTeacher = await prismaClient.teacher.update({
            where: {
                id: teacherId,
            },
            data: teacherUpdateData,
        });
        resPayload.setSuccess("Teacher updated successfully", updateTeacher);
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};

export default updateTeacher;