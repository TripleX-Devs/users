import prismaClient from "@/config/db";
import type express from "express";
import type { Gender, Category } from "@prisma/client";
import bcrypt from "bcrypt";
const addStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {

    const studentData = req.body;
    
    try {
        const existingStudent = await prismaClient.student.findFirst({
            where: {
                OR: [
               
                    { universityEmail: studentData.universityEmail },
                    { rollNo: studentData.rollNo },
                ],
            },
        });
        if (existingStudent) {
            return res.status(409).json({ message: "Student already exists" });
        }

        const hashedPassword = await bcrypt.hash(studentData.universityEmailPassword, 10);

        const newStudent = await prismaClient.student.create({
            data: {
                name: studentData.name,
                rollNo: studentData.rollNo,
                gender: studentData.gender.toUpperCase() as Gender,
                profilePicUrl: studentData.profilePicUrl,
                dateOfBirth: new Date(studentData.dateOfBirth),
                phoneNumber: studentData.phoneNumber,
                email: studentData.email,
                category: studentData.category.toUpperCase() as Category,
                permanentAddress: studentData.permanentAddress,
                currentAddress: studentData.currentAddress,
                city: studentData.city,
                state: studentData.state,
                pincode: studentData.pincode,
                country: studentData.country,
                universityRegistrationNumber: studentData.universityRegistrationNumber,
                admissionNumber: studentData.admissionNumber,
                universityName: studentData.universityName,
                universityEmail: studentData.universityEmail,
                universityEmailPassword: hashedPassword,
                group: studentData.group,
                batchYear: studentData.batchYear,
                courseName: studentData.courseName,
                hostelFacility: studentData.hostelFacility,
                dateOfAdmission: new Date(studentData.dateOfAdmission),
                receiptNumber: studentData.receiptNumber,
                tenthBoardName: studentData.tenthBoardName,
                tenthMaxMarks: studentData.tenthMaxMarks,
                tenthObtainedMarks: studentData.tenthObtainedMarks,
                tenthpercentage: studentData.tenthpercentage,
                tenthSchoolName: studentData.tenthSchoolName,
                twelthBoardName: studentData.twelthBoardName,
                twelthMaxMarks: studentData.twelthMaxMarks,
                twelthObtainedMarks: studentData.twelthObtainedMarks,
                twelthpercentage: studentData.twelthpercentage,
                twelthSchoolName: studentData.twelthSchoolName,
                fatherName: studentData.fatherName,
                fatherOccupation: studentData.fatherOccupation,
                fatherPhoneNumber: studentData.fatherPhoneNumber,
                fatherEmail: studentData.fatherEmail,
                motherName: studentData.motherName,
                motherOccupation: studentData.motherOccupation,
                motherPhoneNumber: studentData.motherPhoneNumber,
                motherEmail: studentData.motherEmail,
                guardianName: studentData.guardianName,
                guardianOccupation: studentData.guardianOccupation,
                guardianPhoneNumber: studentData.guardianPhoneNumber,
                guardianEmail: studentData.guardianEmail,
            },
        });
        res.status(201).json({
            message: "Student added successfully",
            data: newStudent,
        });
    } catch (err) {
        next(err);
    }
};

export default addStudentData;