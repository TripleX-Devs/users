import express from "express";
import prismaClient from "@/config/db";
import type { Prisma } from "@prisma/client";
import multer from "multer";
import path from "node:path";
import xlsx from "xlsx";
import { Readable } from "node:stream";
import type { Gender, Category } from "@prisma/client";
import csvParser from "csv-parser";

import bcrypt from "bcrypt";
import { studentSignUpSchemaValidation } from "@/Validation/Student/SchemaValidation";

import ResponsePayload from "@/utils/resGenerator";
// const upload = multer();
// const app = express();

const addStudentsDataBulk = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "addStudentsDataBulk";
    const resPayload = new ResponsePayload();
    const file = req.file;
    if (!file) {
        resPayload.setError("No file uploaded.");
        console.log(resPayload, `-> response for ${funcName} controller`);
        return res.status(400).json(resPayload);
    }

    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === ".csv") {
        if (file.size === 0) {
            resPayload.setError("File is empty");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(400).json(resPayload)
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

// Insert batch of rows into the database
async function insertBatch(data: Prisma.StudentCreateManyInput[], res: express.Response, funcName: string) {
    const resPayload = new ResponsePayload();
    try {
        await prismaClient.$transaction(async (tx) => {
            // Insert batch of students
            await tx.student.createMany({
                data,
                skipDuplicates: true, // Skip records that violate unique constraints
            });

            // Create outbox events for each student
            for (const student of data) {
                await tx.outboxEvent.create({
                    data: {
                        eventType: "student.created",
                        payload: {
                            rollNumber: student.rollNo,
                            group: student.group,
                            name: student.name,
                        },
                    },
                });
            }
        });

        console.log("Batch Data inserted successfully");
        resPayload.setSuccess("Batch Data inserted successfully");
        return res.status(201).json(resPayload);
    } catch (error) {
        resPayload.setError("Error inserting batch into DB");
        console.error(resPayload, `-> response for ${funcName} controller`);
        return res.status(500).json(resPayload);
    }
}

// Handle CSV file
function handleCSVFile(file: Express.Multer.File, res: express.Response) {
    const funcName = "handleCSVFile";
    const resPayload = new ResponsePayload();
    const csvData: Prisma.StudentCreateManyInput[] = [];
    const validationErrors: string[] = [];
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    readableStream.pipe(csvParser()).on("data", (row) => {

        const { error, value } = studentSignUpSchemaValidation.validate(row);

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
            phoneNumber: value.phoneNumber.toString(),
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
            return res.status(400).json(resPayload);
        }

        try {
            if (csvData.length > 0) {
                // Hash passwords asynchronously
                try {
                    // Wait for all password hashing to complete
                    await Promise.all(
                        csvData.map(async (value) => {
                            value.universityEmailPassword = await bcrypt.hash(value.universityEmailPassword, 10);
                        })
                    );

                    // Insert batch data after hashing
                    await insertBatch(csvData,res,funcName);
                } catch (err) {
                    resPayload.setError("Error inserting batch");
                    console.error(resPayload, `-> response for ${funcName} controller`);
                    return res.status(500).json(resPayload);
                }
            }

            // Respond success after processing
            resPayload.setSuccess("CSV file processed and data inserted successfully.");
            console.log(resPayload, `-> response for ${funcName} controller`);
            res.status(200).json(resPayload);

        } catch (err) {
            resPayload.setError("Error inserting batch or finding duplicate in data");
            console.error(resPayload, `-> response for ${funcName} controller`);
            res.status(500).json(resPayload);
        }
    });

    readableStream.on("error", (error) => {
        resPayload.setError("Error processing CSV");
        console.error(resPayload, `-> response for ${funcName} controller`);
        res.status(500).json(resPayload);
    });
}

// Handle Excel file
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
            const { error, value } = studentSignUpSchemaValidation.validate(row);
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
            resPayload.setSuccess("Excel file processed and data inserted successfully.");
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
            await insertBatch(chunk,res, funcName);
            currentIndex += chunkSize;
            processChunk();
        } catch (err) {
            resPayload.setError("Error inserting batch");
            console.error(resPayload, `-> response for ${funcName} controller`);
            res.status(500).json(resPayload);
        }
    };

    processChunk();
}

export default addStudentsDataBulk;