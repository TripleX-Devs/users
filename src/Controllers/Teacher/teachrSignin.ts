import prismaClient from "@/config/db";
import type express from "express";

import { comparePasswordFunction } from "@/Helpers/HashPassword";
import { createToken, type JWT } from "@/Helpers/createTokens";

const teacherSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!teacherData) {
            throw new Error("Teacher not found with the provided email");
        }

        const teacherHashPassword = teacherData.universityEmailPassword;
   
        const passwordMatched = await comparePasswordFunction(
            universityEmailPassword,
            teacherHashPassword,
        );

        if (passwordMatched) {
            const userAccessTokenPayload: JWT = {
                sub: teacherData.id.toString(), // The subject of the token is the user's ID
                rollType: "teacher",
                userData: {
                    name: teacherData.name,
                    universityEmail: teacherData.universityEmail,
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
                .json({ message: "Teacher signed in successfully" ,
                    userId: teacherData.id,

                });
        }
        throw new Error("Invalid password");
    } catch (err) {
        next(err);
    }
};

export default teacherSignIn;