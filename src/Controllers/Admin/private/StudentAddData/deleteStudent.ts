import prismaClient from "@/config/db";
import type express from "express";

const deleteStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const studentRollNo = req.params.rollNo;
       
        const studentData = await prismaClient.student.findUnique({
            where: {
                rollNo: studentRollNo,
            },
        });

        
        if (!studentData) {
            return res.status(404).send("Student not found");
        }

        const student = await prismaClient.student.delete({
            where: {
                rollNo: studentRollNo,
            },
        });

        return res.status(200).send({message: "Student deleted successfully",success:true});
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

export default deleteStudent;