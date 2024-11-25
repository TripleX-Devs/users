import prismaClient from "@/config/db";
import type express from "express";

import { comparePasswordFunction } from "@/Helpers/HashPassword";
import { createToken, type JWT } from "@/Helpers/createTokens";

const studentSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const studentData = await prismaClient.student.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!studentData) {
            throw new Error("Student not found with the provided email");
        }

        const studentHashPassword = studentData.universityEmailPassword;
   
        const passwordMatched = await comparePasswordFunction(
            universityEmailPassword,
            studentHashPassword,
        );

        if (passwordMatched) {
            const userAccessTokenPayload: JWT = {
                sub: studentData.rollNo.toString(), // The subject of the token is the student's roll number
                rollType: "student",
                userData: {
                    name: studentData.name,
                    universityEmail: studentData.universityEmail,
                },
            };
            const token = createToken(userAccessTokenPayload);

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.cookie("role", "student",{  
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,

            })

            return res
                .status(200)
                .json({ message: "Student signed in successfully",
                    userId: studentData.rollNo,
                    name: studentData.name,
                    token: token,
                    universityEmail: studentData.universityEmail,
                });
        }
        throw new Error("Invalid password");
    } catch (err) {
        next(err);
    }
};

export default studentSignIn;