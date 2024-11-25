import prismaClient from "@/config/db";
import type express from "express";
import bcrypt from "bcrypt";
const updateOneStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const studentRollNo = req.params.rollNo;

        const student = await prismaClient.student.findUnique({
            where: {
                rollNo: studentRollNo,
            },
        });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        const studentData = req.body;
         // Check if password is provided and hash it
         if (studentData.universityEmailPassword) {
            studentData.universityEmailPassword = await bcrypt.hash(studentData.universityEmailPassword, 10);
        }

        const updateStudent = await prismaClient.student.update({
            where: {
                rollNo: studentRollNo,
            },
            data: {
                ...studentData,
            },
        });

        return res.status(200).send({message: "Student updated successfully",success:true,data:updateStudent});
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

export default updateOneStudentData;