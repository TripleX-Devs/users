import type express from "express";
import prismaClient from "@/config/db";

import { hashedPasswordFunction } from "@/Helpers/HashPassword";

const adminSignUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const {
        name,
        gender,
        profilePicUrl,
        dateOfBirth,
        phoneNumber,
        email,
        category,
        password,
        permanentAddress,
        currentAddress,
        city,
        state,
        pincode,
        country,
        universityEmail,
        universityEmailPassword,
    } = req.body;

    try {
        const existingUser = await prismaClient.admin.findFirst({
            where: {
                OR: [{ email: email }, { universityEmail: universityEmail }],
            },
        });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "User already exists with the provided email or university email",
            });
        }

        const adminHashedPassword = await hashedPasswordFunction(password);

        const hashUniversityEmailPassword = await hashedPasswordFunction(
            universityEmailPassword,
        );

        // Create a new Admin
        const user = await prismaClient.admin.create({
            data: {
                name,
                gender,
                profilePicUrl,
                dateOfBirth: new Date(dateOfBirth),
                phoneNumber,
                email,
                category,
                password: adminHashedPassword,
                permanentAddress,
                currentAddress,
                city,
                state,
                pincode,
                country,
                universityEmail,
                universityEmailPassword: hashUniversityEmailPassword,
            },
        });

        res.status(201).json({
            message: "Admin registered successfully",
            userId: user.id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default adminSignUp;
