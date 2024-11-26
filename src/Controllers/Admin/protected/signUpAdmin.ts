import type express from "express";
import prismaClient from "@/config/db";

import { hashedPasswordFunction } from "@/Helpers/HashPassword";
import ResponsePayload from "@/utils/resGenerator";

const adminSignUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName= "adminSignUp";
    const resPayload = new ResponsePayload();

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
            resPayload.setConflict("User already exists with the provided email or university email");
            return res.status(409).json(resPayload);
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
        console.log(resPayload, `-> response for ${funcName} controller`);
        resPayload.setSuccess("Admin registered successfully", { user: user });
        return res.status(201).json(resPayload);
    } catch (err) {
        console.error(err);
        resPayload.setError("Internal server error");
        return res.status(500).json(resPayload);
    }
};

export default adminSignUp;
