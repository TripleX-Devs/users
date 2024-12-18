import type express from "express";
import prismaClient from "@/config/db";
import ResponsePayload from "@/utils/resGenerator";

const getAllTeachers = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "getAllTeachers";
    const resPayload = new ResponsePayload();
    try {
        const teachersData = await prismaClient.teacher.findMany();

        if (!teachersData || teachersData.length === 0) {
            resPayload.setError("No teachers found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        resPayload.setSuccess("All teachers data", teachersData);
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(200).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default getAllTeachers;