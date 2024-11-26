import  express from "express";
import prismaClient from "@/config/db";
import type { Prisma } from "@prisma/client";
import multer from "multer";
import path from "node:path";
import xlsx from "xlsx";
import { Readable } from "node:stream";
import type { Gender, Category } from "@prisma/client";
import csvParser from "csv-parser";

import { teacherUpdateSchema } from "@/Validation/Teacher/SchemaValidation";
// import { read } from "node:fs";
import bcrypt from "bcrypt";

// const upload = multer();
// const app = express();

import ResponsePayload from "@/utils/resGenerator";

const updateBulkTeacherData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "updateBulkTeacherData";
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

const updateOneTeacherData = async (
    data: Prisma.TeacherUpdateInput,
    universityEmail: string,
) => {
    const funcName = "updateOneTeacherData";
    const resPayload = new ResponsePayload();
    try {
        await prismaClient.teacher.update({
            where: {
                universityEmail,
            },
            data: {
                ...data,
            },
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

    const csvData: Prisma.TeacherCreateManyInput[] = [];

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    const validationErrors: string[] = [];

    readableStream.pipe(csvParser()).on("data", (row) => {
        const { error, value } = teacherUpdateSchema.validate(row);

        if (error) {
            validationErrors.push(`Validation error in row: ${error.message}`);
            return null;
        }

        const formattedRow: Prisma.TeacherCreateManyInput = {
            name: value.name,
            gender: value.gender.toUpperCase() as Gender,
            profilePicUrl: value.profilePicUrl,
            dateOfBirth: new Date(value.dateOfBirth),
            phoneNumber: value.phoneNumber.toString(),
            email: value.email,
            category: value.category.toUpperCase() as Category,
            password: value.password,
            permanentAddress: value.permanentAddress,
            currentAddress: value.currentAddress,
            city: value.city,
            state: value.state,
            pincode: value.pincode.toString(),
            country: value.country,
            universityEmail: value.universityEmail,
            universityEmailPassword: value.universityEmailPassword,
            department: value.department,
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
            await Promise.all(
                csvData.map(async (value) => {
                    value.universityEmailPassword = await bcrypt.hash(value.universityEmailPassword, 10);
                })
            );
            for (const data of csvData) {
                await updateOneTeacherData(data, data.universityEmail);
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

    const excelData: Prisma.TeacherCreateManyInput[] = [];
    const validationErrors: string[] = [];

    xlsx.utils
        .sheet_to_json<Prisma.TeacherCreateManyInput>(worksheet)
        .map((row) => {
            const { error, value } = teacherUpdateSchema.validate(row);
            if (error) {
                validationErrors.push(
                    `Validation error in row: ${error.message}`,
                );
                return null; // Skip this row
            }

            const formattedRow: Prisma.TeacherCreateManyInput = {
                name: value.name,
                gender: value.gender.toUpperCase() as Gender,
                profilePicUrl: value.profilePicUrl,
                dateOfBirth: new Date(value.dateOfBirth),
                phoneNumber: value.phoneNumber.toString(),
                email: value.email,
                category: value.category.toUpperCase() as Category,
                password: value.password,
                permanentAddress: value.permanentAddress,
                currentAddress: value.currentAddress,
                city: value.city,
                state: value.state,
                pincode: value.pincode.toString(),
                country: value.country,
                universityEmail: value.universityEmail,
                universityEmailPassword: value.universityEmailPassword,
                department: value.department,
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
                await updateOneTeacherData(data, data.universityEmail);
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


export default updateBulkTeacherData;
