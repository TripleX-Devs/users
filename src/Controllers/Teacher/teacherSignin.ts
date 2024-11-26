import prismaClient from "@/config/db";
import type express from "express";

import { comparePasswordFunction } from "@/Helpers/HashPassword";
import { createToken, type JWT } from "@/Helpers/createTokens";

import ResponsePayload from '@/utils/resGenerator';


const teacherSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = 'teacherSignIn';
    const resPayload = new ResponsePayload();
    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!teacherData) {
            const resMessage = 'Teacher not found with the provided email';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
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
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,
            });
            
            res.cookie("role", "teacher",{  
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,

            })

            const resMessage = 'Teacher signed in successfully';
            resPayload.setSuccess(resMessage, {
                userId: teacherData.id,
                token: token,
                role: 'teacher',
                name: teacherData.name,
                universityEmail: teacherData.universityEmail,
            });
            
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(200).json(resPayload);
        }
        else {
            const resMessage = 'Invalid password';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(401).json(resPayload);
        }
    } catch (err) {
        next(err);
    }
};

export default teacherSignIn;