import prismaClient from "@/config/db";
import type express from "express";
import bcrypt from "bcrypt";
import ResponsePayload from "@/utils/resGenerator";

const updateOneStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "updateOneStudentData";
    const resPayload = new ResponsePayload();
    try {
        const studentRollNo = req.params.rollNo;

        const student = await prismaClient.student.findUnique({
            where: {
                rollNo: studentRollNo,
            },
        });

        if (!student) {
            resPayload.setError("Student not found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        const studentData = req.body;
        // Check if password is provided and hash it
        if (studentData.universityEmailPassword) {
            studentData.universityEmailPassword = await bcrypt.hash(studentData.universityEmailPassword, 10);
        }

        await prismaClient.$transaction(async (tx) => {
            const updateStudent = await tx.student.update({
                where: {
                    rollNo: studentRollNo,
                },
                data: {
                    ...studentData,
                },
            });

            await tx.outboxEvent.create({
                data: {
                    eventType: "student.created",
                    payload: {
                        rollNumber: updateStudent.rollNo,
                        name: updateStudent.name,
                    },
                },
            });

            resPayload.setSuccess("Student updated successfully", updateStudent);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(200).json(resPayload);
        });
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default updateOneStudentData;