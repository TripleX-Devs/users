import prismaClient from "@/config/db";
import type express from "express";
import type { Gender, Category } from "@prisma/client";
import bcrypt from "bcrypt";

import ResponsePayload from "@/utils/resGenerator";


const addStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "addStudentData";
    const resPayload = new ResponsePayload();

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
            resPayload.setError("Student already exists");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(409).json(resPayload);
        }

        const hashedPassword = await bcrypt.hash(studentData.universityEmailPassword, 10);

        const newStudent = await prismaClient.$transaction(async (tx) => {
            const Student = await tx.student.create({
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
            await tx.outboxEvent.create({
                data : {
                    eventType : "student.created",
                    payload : {
                        rollNumber : Student.rollNo,
                        group : Student.group,
                        name : Student.name
                    }
                }
            })

            return Student;
        })
        resPayload.setSuccess("Student added successfully", newStudent);
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(201).json(resPayload);
    } catch (err) {
        resPayload.setError("Internal server error");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
};

export default addStudentData;