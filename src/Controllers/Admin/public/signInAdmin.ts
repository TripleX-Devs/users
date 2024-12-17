import prismaClient from '@/config/db';
import type express from 'express';

import { comparePasswordFunction } from '@/Helpers/HashPassword';
import { createRefreshToken, createToken, type JWT } from '@/Helpers/createTokens';
import ResponsePayload from '@/utils/resGenerator';

const adminSignIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const funcName = 'adminSignIn';
    const resPayload = new ResponsePayload();

    try {
        const { universityEmail, universityEmailPassword } = req.body;

        const adminData = await prismaClient.admin.findUnique({
            where: {
                universityEmail: universityEmail,
            },
        });
        if (!adminData) {
            const resMessage = 'Admin not found with the provided email';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        const adminHashPassword = adminData.universityEmailPassword;

        const passwordMatched = await comparePasswordFunction(
            universityEmailPassword,
            adminHashPassword,
        );

        if (passwordMatched) {
            const userAccessTokenPayload: JWT = {
                sub: adminData.id.toString(), // The subject of the token is the user's ID
                rollType: 'admin',
                userData: {
                    name: adminData.name,
                    universityEmail: adminData.universityEmail,
                },
            };
            const accesstoken = createToken(userAccessTokenPayload);
            const refreshToken = createRefreshToken(userAccessTokenPayload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,       // Prevent access from JavaScript
                secure: true,         // Use HTTPS in production
                sameSite: 'strict',   // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              });

            // res.cookie('role', 'admin', {
            //     httpOnly: false,
            //     secure: true,
            //     sameSite: 'none',
            //     maxAge: 1000 * 60 * 60 * 24,
            // });

            const resMessage = 'Admin signed in successfully';
            resPayload.setSuccess(resMessage, {
                userId: adminData.id,
                accesstoken: accesstoken,
                role: 'admin',
                name: adminData.name,
                universityEmail: adminData.universityEmail,
            });

            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(200).json(resPayload);
        } else {
            const resMessage = 'Invalid password';
            resPayload.setConflict(resMessage);
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(401).json(resPayload);
        }
    } catch (err) {
        next(err);
    }
};

export default adminSignIn;
