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

const upload = multer();
const app = express();

const updateBulkStudentData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send("No file uploaded");
    }
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === ".csv") {
        if (file.size === 0) {
            return res.status(400).send("File is empty");
        }
        handleCSVFile(file, res);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
        if (file.size === 0) {
            return res.status(400).send("File is empty");
        }
        // handleExcelFile(file, res);
    } else {
        return res.status(400).send("Unsupported file format");
    }
};

const updateOneStudentData = async (
    data: Prisma.StudentUpdateInput,
    universityEmail: string,
) => {
    try {
        await prismaClient.student.update({
            where: {
                universityEmail,
            },
            data: {
                ...data,
            },
        });
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
};

const handleCSVFile = async (
    file: Express.Multer.File,
    res: express.Response,
) => {
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
            return res
                .status(400)
                .json({ message: validationErrors.join(", ") });
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
            res.status(200).json({
                message: "CSV file processed and data updated successfully.",
            });
        } catch (error) {
            console.error("Error updating data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    readableStream.on("error", (error) => {
        console.error("Error processing CSV:", error);
        res.status(500).send("Error processing CSV.");
    });
};



export default updateBulkStudentData;