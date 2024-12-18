import type express from "express";
import prismaClient from "@/config/db";
import jwt  from "jsonwebtoken";

import ResponsePayload from '@/utils/resGenerator';
const getAdminDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const resPayload = new ResponsePayload();
    try {
       
        const id = req.user?.sub

        const adminData = await prismaClient.admin.findUnique({
            where: {
                id: id,
            },
        });

        if (!adminData) {
            throw new Error("Admin not found");
        }

        resPayload.setSuccess('Admin details', adminData);
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};

export default getAdminDetails;
