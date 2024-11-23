import prismaClient from "@/config/db";
import type express from "express";

const updateTeacher = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const teacherUpdateData = req.body;
        const teacherId = req.params.id;

        if (!teacherId) {
            return res.status(400).json({ message: "Teacher id is required" });
        }
        if (!teacherUpdateData || Object.keys(teacherUpdateData).length === 0) {
            return res.status(400).json({ message: "Update data is required" });
        }
        const teacherData = await prismaClient.teacher.findFirst({
            where: {
                id: teacherId,
            },
        });

        if (!teacherData) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const updateTeacher = await prismaClient.teacher.update({
            where: {
                id: teacherId,
            },
            data: teacherUpdateData,
        });
        return res.status(200).json({
            message: "Teacher updated successfully",
            teacher: updateTeacher,
        });
    } catch (err) {
        next(err);
    }
};

export default updateTeacher;