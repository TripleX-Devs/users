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
       

        const rollNumber=req.user?.sub;
      

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
