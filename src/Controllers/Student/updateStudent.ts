import prismaClient from "@/config/db";
import type express from "express";
import ResponsePayload from "@/utils/resGenerator";
import jwt from "jsonwebtoken";

const updateStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const resPayload = new ResponsePayload();
    try {
        const studentUpdateData = req.body;
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            sub: string;
            rollType: string;
            userData: { name: string; universityEmail: string };
        };
        const rollNo=decoded.sub;

        if (!rollNo) {
            resPayload.setError("Student Roll Number is required");
            return res.status(400).json(resPayload);
        }
        if (!studentUpdateData || Object.keys(studentUpdateData).length === 0) {
            resPayload.setError("Update data is required");
            return res.status(400).json(resPayload);
        }
        const studentData = await prismaClient.student.findFirst({
            where: {
                rollNo: rollNo,
            },
        });

        if (!studentData) {
            resPayload.setError("Student not found");
            return res.status(404).json(resPayload);
        }

        const updateStudent = await prismaClient.student.update({
            where: {
                rollNo: rollNo,
            },
            data: studentUpdateData,
        });
        resPayload.setSuccess("Student updated successfully", updateStudent);
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};

export default updateStudent;