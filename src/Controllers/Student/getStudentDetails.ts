import type express from 'express';
import prismaClient from '@/config/db';
import jwt from 'jsonwebtoken';

import ResponsePayload from '@/utils/resGenerator';

const getStudentDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const resPayload = new ResponsePayload();
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            sub: string;
            rollType: string;
            userData: { name: string; universityEmail: string };
        };

        const rollNumber = decoded.sub;

        const studentData = await prismaClient.student.findUnique({
            where: {
                rollNo: rollNumber,
            },
        });
        if (!studentData) {
            throw new Error('Student not found');
        }

        resPayload.setSuccess('Student details', studentData);
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};

export default getStudentDetails;
