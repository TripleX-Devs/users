import type express from "express";
import prismaClient from "@/config/db";
import jwt from "jsonwebtoken";
import ResponsePayload from '@/utils/resGenerator';

const getTeacherDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {   
        const resPayload = new ResponsePayload();
       
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };

        const teacherId=decoded.sub;
        
        const teacherData = await prismaClient.teacher.findUnique({
            where: {
                id: teacherId,
            },
        });

        if (!teacherData) {
            throw new Error("Teacher not found");
        }
        resPayload.setSuccess('Teacher details', teacherData);
        return res.status(200).json(resPayload);
        
    } catch (err) {
        next(err);
    }
};

export default getTeacherDetails;