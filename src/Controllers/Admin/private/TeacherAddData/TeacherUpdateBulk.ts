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
import { read } from "node:fs";
import bcrypt from "bcrypt";

const upload = multer();
const app = express();

const updateBulkTeacherData = async (
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

const updateOneTeacherData = async (
    data: Prisma.TeacherUpdateInput,
    universityEmail: string,
) => {
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
        console.error("Error updating data:", error);
        throw error;
    }
};

const handleCSVFile = async (
    file: Express.Multer.File,
    res: express.Response,
) => {
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
            phoneNumber: value.phoneNumber,
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
            return res
                .status(400)
                .json({ message: validationErrors.join(", ") });
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
            res.status(200).json({
                message: "CSV file processed and data updated successfully.",
            });
        } catch (error) {
            console.error("Error updating data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

export default updateBulkTeacherData;
