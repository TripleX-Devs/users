import prismaClient from "@/config/db";
import type express from "express";
import bcrypt from "bcrypt";
import ResponsePayload from "@/utils/resGenerator";

const updateOneTeacherData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "updateOneTeacherData";
    const resPayload = new ResponsePayload()
    try {
        const teacherId = req.params.id;

        const teacher = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        if (!teacher) {
            resPayload.setError("Teacher not found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
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

        resPayload.setSuccess("Teacher updated successfully", updateTeacher);
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(200).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default updateOneTeacherData;
