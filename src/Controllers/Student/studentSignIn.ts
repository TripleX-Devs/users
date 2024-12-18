import prismaClient from "@/config/db";
import type express from "express";

import { comparePasswordFunction } from "@/Helpers/HashPassword";
import { createRefreshToken, createToken, type JWT } from "@/Helpers/createTokens";
import ResponsePayload from '@/utils/resGenerator';


const studentSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = "studentSignIn";
    const resPayload = new ResponsePayload();
    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const studentData = await prismaClient.student.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!studentData) {
            const resMessage = 'Student not found with the provided email';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
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
            const accesstoken = createToken(userAccessTokenPayload);
            const refreshToken = createRefreshToken(userAccessTokenPayload);


            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',   // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            // res.cookie("role", "student",{  
            //     httpOnly: false,
            //     secure: true,
            //     sameSite: "none",
            //     maxAge: 1000 * 60 * 60 * 24,

            // })


            const resMessage = 'Student signed in successfully';
            resPayload.setSuccess(resMessage, {
                userId: studentData.rollNo,
                accesstoken: accesstoken,
                role: 'student',
                name: studentData.name,
                universityEmail: studentData.universityEmail,
            });

            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(200).json(resPayload);
        }else{
            const resMessage = 'Invalid password';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(401).json(resPayload);

        }
       
    } catch (err) {
        next(err);
    }
};

export default studentSignIn;