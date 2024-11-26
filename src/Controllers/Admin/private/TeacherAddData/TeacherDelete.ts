import prismaClient from "@/config/db";
import type express from "express";
import ResponsePayload from "@/utils/resGenerator";

const deleteTeacher = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "deleteTeacher";
    const resPayload = new ResponsePayload();
    try {
        const teacherId = req.params.id;
        // console.log(teacherId);
        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });


        if (!teacherData) {
            resPayload.setError("Teacher not found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        await prismaClient.teacher.delete({
            where: {
                id: teacherId,
            },
        });

        resPayload.setSuccess("Teacher deleted successfully");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(200).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default deleteTeacher;
