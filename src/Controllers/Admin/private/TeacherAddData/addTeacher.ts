import prismaClient from "@/config/db";
import type express from "express";
import type { Gender, Category } from "@prisma/client";
import bcrypt from "bcrypt";
import ResponsePayload from "@/utils/resGenerator";
const addTeacherData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {

    const funcName = "addTeacherData";
    const resPayload = new ResponsePayload();
    
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
            resPayload.setError("Teacher already exists");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(409).json(resPayload);
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
        resPayload.setSuccess("Teacher added successfully", newTeacher);
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(201).json(resPayload);

    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};
export default addTeacherData;
