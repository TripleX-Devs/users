import type express from "express";
import prismaClient from "@/config/db";
import ResponsePayload from "@/utils/resGenerator";

const getAllStudents = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "getAllStudents";
    const resPayload = new ResponsePayload();
    try {
        const studentsData = await prismaClient.student.findMany();

        if (!studentsData || studentsData.length === 0) {
            resPayload.setError("No students found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        resPayload.setSuccess("All students data", studentsData);
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(200).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default getAllStudents;