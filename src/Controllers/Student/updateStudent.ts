import prismaClient from "@/config/db";
import type express from "express";

const updateStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const studentUpdateData = req.body;
        const rollNo= req.params.rollNo;

        if (!rollNo) {
            return res.status(400).json({ message: "Student id is required" });
        }
        if (!studentUpdateData || Object.keys(studentUpdateData).length === 0) {
            return res.status(400).json({ message: "Update data is required" });
        }
        const studentData = await prismaClient.student.findFirst({
            where: {
                rollNo: rollNo,
            },
        });

        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updateStudent = await prismaClient.student.update({
            where: {
                rollNo: rollNo,
            },
            data: studentUpdateData,
        });
        return res.status(200).json({
            message: "Student updated successfully",
            student: updateStudent,
        });
    } catch (err) {
        next(err);
    }
};

export default updateStudent;