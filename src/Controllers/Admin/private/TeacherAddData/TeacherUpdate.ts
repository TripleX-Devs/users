import prismaClient from "@/config/db";
import type express from "express";
import bcrypt from "bcrypt";
const updateOneTeacherData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const teacherId = req.params.id;

        const teacher = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        const teacherData = req.body;

        if (teacherData.universityEmailPassword) {
            teacherData.universityEmailPassword = await bcrypt.hash(teacherData.universityEmailPassword, 10);
        }


        const updateTeacher = await prismaClient.teacher.update({
            where: {
                id: teacherId,
            },
            data: {
                ...teacherData,
            },
        });

        return res.status(200).send(updateTeacher);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

export default updateOneTeacherData;
