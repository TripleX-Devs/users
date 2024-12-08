import express from "express";
import prismaClient from "@/config/db";
import type { Prisma } from "@prisma/client";
import multer from "multer";
import path from "node:path";
import xlsx from "xlsx";
import { Readable } from "node:stream";
import type { Gender, Category } from "@prisma/client";
import csvParser from "csv-parser";
import { studentUpdateSchemaValidation } from "@/Validation/Student/SchemaValidation";
import bcrypt from "bcrypt";
import ResponsePayload from "@/utils/resGenerator";

// const upload = multer();
// const app = express();

const updateBulkStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "updateBulkStudentData";
    const resPayload = new ResponsePayload();
    const file = req.file;

    if (!file) {
        resPayload.setError("No file uploaded");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(400).json(resPayload);
    }
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === ".csv") {
        if (file.size === 0) {
            resPayload.setError("File is empty");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(400).json(resPayload);
        }
        handleCSVFile(file, res);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
        if (file.size === 0) {
            resPayload.setError("File is empty");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(400).json(resPayload);
        }
        handleExcelFile(file, res);
    } else {
        resPayload.setError("Unsupported file format");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(400).json(resPayload);
    }
};

const updateOneStudentData = async (
    data: Prisma.StudentUpdateInput,
    universityEmail: string,
) => {
    const funcName = "updateOneStudentData";
    const resPayload = new ResponsePayload();
    try {
        await prismaClient.$transaction(async (tx) => {
            const updateStudent = await tx.student.update({
                where: {
                    universityEmail,
                },
                data: {
                    ...data,
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
        });
    } catch (error) {
        resPayload.setError("Error updating data");
        console.error(resPayload, `-> response for ${funcName} controller`);
        throw error;
    }
};

const handleCSVFile = async (
    file: Express.Multer.File,
    res: express.Response,
) => {
    const funcName = "handleCSVFile";
    const resPayload = new ResponsePayload();
    const csvData: Prisma.StudentCreateManyInput[] = [];

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    const validationErrors: string[] = [];

    readableStream.pipe(csvParser()).on("data", (row) => {
        const { error, value } = studentUpdateSchemaValidation.validate(row);

        if (error) {
            validationErrors.push(`Validation error in row: ${error.message}`);
            return null;
        }

        const formattedRow: Prisma.StudentCreateManyInput = {
            name: value.name,
            rollNo: value.rollNo,
            gender: value.gender.toUpperCase() as Gender,
            profilePicUrl: value.profilePicUrl,
            dateOfBirth: new Date(value.dateOfBirth),
            phoneNumber: value.phoneNumber,
            email: value.email,
            category: value.category.toUpperCase() as Category,
            permanentAddress: value.permanentAddress,
            currentAddress: value.currentAddress,
            city: value.city,
            state: value.state,
            pincode: value.pincode.toString(),
            country: value.country,
            universityRegistrationNumber: value.universityRegistrationNumber,
            admissionNumber: value.admissionNumber,
            universityName: value.universityName,
            universityEmail: value.universityEmail,
            universityEmailPassword: value.universityEmailPassword,
            group: value.group,
            batchYear: value.batchYear,
            courseName: value.courseName,
            hostelFacility: value.hostelFacility,
            dateOfAdmission: new Date(value.dateOfAdmission),
            receiptNumber: value.receiptNumber,
            tenthBoardName: value.tenthBoardName,
            tenthMaxMarks: value.tenthMaxMarks,
            tenthObtainedMarks: value.tenthObtainedMarks,
            tenthpercentage: value.tenthpercentage,
            tenthSchoolName: value.tenthSchoolName,
            twelthBoardName: value.twelthBoardName,
            twelthMaxMarks: value.twelthMaxMarks,
            twelthObtainedMarks: value.twelthObtainedMarks,
            twelthpercentage: value.twelthpercentage,
            twelthSchoolName: value.twelthSchoolName,
            fatherName: value.fatherName,
            fatherOccupation: value.fatherOccupation,
            fatherPhoneNumber: value.fatherPhoneNumber,
            fatherEmail: value.fatherEmail,
            motherName: value.motherName,
            motherOccupation: value.motherOccupation,
            motherPhoneNumber: value.motherPhoneNumber,
            motherEmail: value.motherEmail,
            guardianName: value.guardianName,
            guardianOccupation: value.guardianOccupation,
            guardianPhoneNumber: value.guardianPhoneNumber,
            guardianEmail: value.guardianEmail,
        };

        csvData.push(formattedRow);
    });

    readableStream.on("end", async () => {
        if (validationErrors.length > 0) {
            resPayload.setError(validationErrors.join(", "));
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res
                .status(400)
                .json(resPayload);
        }

        try {
            // Hash passwords asynchronously
            await Promise.all(
                csvData.map(async (value) => {
                    value.universityEmailPassword = await bcrypt.hash(value.universityEmailPassword, 10);
                })
            );
            for (const data of csvData) {
                await updateOneStudentData(data, data.universityEmail);
            }
            resPayload.setSuccess("CSV file processed and data updated successfully.");
            console.log(resPayload, `-> response for ${funcName} controller`);
            res.status(200).json(resPayload);

        } catch (error) {
            resPayload.setError("Error updating data");
            console.error(resPayload, `-> response for ${funcName} controller`);
            res.status(500).json(resPayload);
        }
    });

    readableStream.on("error", (error) => {
        resPayload.setError("Error processing CSV");
        console.error(resPayload, `-> response for ${funcName} controller`);
        res.status(500).json(resPayload);
    });
};





//to handle excel file
function handleExcelFile(file: Express.Multer.File, res: express.Response) {
    const funcName = "handleExcelFile";
    const resPayload = new ResponsePayload();
    const workbook = xlsx.read(file.buffer);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const excelData: Prisma.StudentCreateManyInput[] = [];
    const validationErrors: string[] = [];

    xlsx.utils
        .sheet_to_json<Prisma.StudentCreateManyInput>(worksheet)
        .map((row) => {
            const { error, value } = studentUpdateSchemaValidation.validate(row);
            if (error) {
                validationErrors.push(
                    `Validation error in row: ${error.message}`,
                );
                return null; // Skip this row
            }

            const formattedRow: Prisma.StudentCreateManyInput = {
                name: value.name,
                rollNo: value.rollNo,
                gender: value.gender.toUpperCase() as Gender,
                profilePicUrl: value.profilePicUrl,
                dateOfBirth: new Date(value.dateOfBirth),
                phoneNumber: value.phoneNumber,
                email: value.email,
                category: value.category.toUpperCase() as Category,
                permanentAddress: value.permanentAddress,
                currentAddress: value.currentAddress,
                city: value.city,
                state: value.state,
                pincode: value.pincode.toString(),
                country: value.country,
                universityRegistrationNumber: value.universityRegistrationNumber,
                admissionNumber: value.admissionNumber,
                universityName: value.universityName,
                universityEmail: value.universityEmail,
                universityEmailPassword: value.universityEmailPassword,
                group: value.group,
                batchYear: value.batchYear,
                courseName: value.courseName,
                hostelFacility: value.hostelFacility,
                dateOfAdmission: new Date(value.dateOfAdmission),
                receiptNumber: value.receiptNumber,
                tenthBoardName: value.tenthBoardName,
                tenthMaxMarks: value.tenthMaxMarks,
                tenthObtainedMarks: value.tenthObtainedMarks,
                tenthpercentage: value.tenthpercentage,
                tenthSchoolName: value.tenthSchoolName,
                twelthBoardName: value.twelthBoardName,
                twelthMaxMarks: value.twelthMaxMarks,
                twelthObtainedMarks: value.twelthObtainedMarks,
                twelthpercentage: value.twelthpercentage,
                twelthSchoolName: value.twelthSchoolName,
                fatherName: value.fatherName,
                fatherOccupation: value.fatherOccupation,
                fatherPhoneNumber: value.fatherPhoneNumber,
                fatherEmail: value.fatherEmail,
                motherName: value.motherName,
                motherOccupation: value.motherOccupation,
                motherPhoneNumber: value.motherPhoneNumber,
                motherEmail: value.motherEmail,
                guardianName: value.guardianName,
                guardianOccupation: value.guardianOccupation,
                guardianPhoneNumber: value.guardianPhoneNumber,
                guardianEmail: value.guardianEmail,
            };

            excelData.push(formattedRow);
        });

    if (validationErrors.length > 0) {
        resPayload.setError(validationErrors.join(", "));
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(400).json(resPayload);
    }

    const chunkSize = 1000;
    let currentIndex = 0;

    const processChunk = async () => {
        const chunk = excelData.slice(currentIndex, currentIndex + chunkSize);
        if (chunk.length === 0) {
            resPayload.setSuccess("Excel file processed and data updated successfully.");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(200).json(resPayload);
        }

        try {
            // Hash passwords asynchronously
            await Promise.all(
                chunk.map(async (value) => {
                    value.universityEmailPassword = await bcrypt.hash(value.universityEmailPassword, 10);
                })
            );  
            for (const data of chunk) {
                await updateOneStudentData(data, data.universityEmail);
            }
            currentIndex += chunkSize;
            processChunk();
        } catch (err) {
            resPayload.setError("Error updating data");
            console.error(resPayload, `-> response for ${funcName} controller`);
            res.status(500).json(resPayload);
        }
    };

    processChunk();
}



export default updateBulkStudentData;