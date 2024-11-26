import prismaClient from "@/config/db";
import type express from "express";
import ResponsePayload from "@/utils/resGenerator";
const deleteStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "deleteStudent";
    const resPayload = new ResponsePayload();

    try {

        
        const studentRollNo = req.params.rollNo;
       
        const studentData = await prismaClient.student.findUnique({
            where: {
                rollNo: studentRollNo,
            },
        });

        
        if (!studentData) {
             resPayload.setError("Student not found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        const student = await prismaClient.student.delete({
            where: {
                rollNo: studentRollNo,
            },
        });

        resPayload.setSuccess("Student deleted successfully");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(200).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default deleteStudent;