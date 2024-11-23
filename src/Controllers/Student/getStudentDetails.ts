import type express from "express";
import prismaClient from "@/config/db";

const getStudentDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const rollNumber = req.params.rollNo;
        
        const studentData = await prismaClient.student.findUnique({
            where: {
                rollNo: rollNumber,
            },
        });
        if (!studentData) {
            throw new Error("Student not found");
        }

        return res
            .status(200)
            .json({ message: "Student details", data: studentData });
    } catch (err) {
        next(err);
    }
};

export default getStudentDetails;