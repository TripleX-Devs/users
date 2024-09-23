import prismaClient from "@/config/db";
import type express from "express";

import { comparePasswordFunction } from "@/Helpers/HashPassword";
import { createToken, type JWT } from "@/Helpers/createTokens";

const adminSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const adminData = await prismaClient.admin.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!adminData) {
            throw new Error("Admin not found with the provided email");
        }

        const adminHashPassword = adminData.universityEmailPassword;

        const passwordMatched = await comparePasswordFunction(
            universityEmailPassword,
            adminHashPassword,
        );

        if (passwordMatched) {
            const userAccessTokenPayload: JWT = {
                sub: adminData.id.toString(), // The subject of the token is the user's ID
                userData: {
                    name: adminData.name,
                    universityEmail: adminData.universityEmail,
                },
            };
            const token = createToken(userAccessTokenPayload);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,
            });

            return res
                .status(200)
                .json({ message: "Admin signed in successfully" });
        }
    } catch (err) {
        next(err);
    }
};

export default adminSignIn;
