import prismaClient from "@/config/db";
import type express from "express";

const deleteTeacher = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const teacherId = req.params.id;
        // console.log(teacherId);
        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        console.log(teacherData);

        if (!teacherData) {
            return res.status(404).send("Teacher not found");
        }

        const teacher = await prismaClient.teacher.delete({
            where: {
                id: teacherId,
            },
        });

        return res.status(200).send(teacher);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

export default deleteTeacher;
