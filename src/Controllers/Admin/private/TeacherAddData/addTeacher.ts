import prismaClient from "@/config/db";
import type express from "express";
import type { Gender, Category } from "@prisma/client";
import bcrypt from "bcrypt";
const addTeacherData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const teacherdata = req.body;

    try {
        const teacherData = await prismaClient.teacher.findFirst({
            where: {
                OR: [
                    { email: teacherdata.email },
                    { universityEmail: teacherdata.universityEmail },
                ],
            },
        });
        if (teacherData) {
            res.status(409).json({ message: "Teacher already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(teacherdata.universityEmailPassword, 10);

        const newTeacher = await prismaClient.teacher.create({
            data: {
                name: teacherdata.name,
                gender: teacherdata.gender.toUpperCase() as Gender,
                profilePicUrl: teacherdata.profilePicUrl,
                dateOfBirth: new Date(teacherdata.dateOfBirth),
                phoneNumber: teacherdata.phoneNumber,
                email: teacherdata.email,
                category: teacherdata.category.toUpperCase() as Category,
                password: teacherdata.password,
                permanentAddress: teacherdata.permanentAddress,
                currentAddress: teacherdata.currentAddress,
                city: teacherdata.city,
                state: teacherdata.state,
                pincode: teacherdata.pincode,
                country: teacherdata.country,
                universityEmail: teacherdata.universityEmail,
                universityEmailPassword: hashedPassword,
                department: teacherdata.department, // Added department property
            },
        });
        res.status(201).json({
            message: "Teacher added successfully",
            data: newTeacher,
        });
    } catch (err) {
        next(err);
    }
};
export default addTeacherData;
