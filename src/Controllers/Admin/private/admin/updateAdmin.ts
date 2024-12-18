import prismaClient from "@/config/db";
import type express from "express";
import ResponsePayload from "@/utils/resGenerator";
import jwt from "jsonwebtoken";
const updateAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const resPayload = new ResponsePayload();
    try {
        const adminUpdateData = req.body;
        const id = req.user?.sub;

        const adminId = id;


        if (!adminId) {
            resPayload.setError("Admin id is required");
            return res.status(400).json(resPayload);
        }
        if (!adminUpdateData || Object.keys(adminUpdateData).length === 0) {
            resPayload.setError("Update data is required");
            return res.status(400).json(resPayload);
        }
        const adminData = await prismaClient.admin.findFirst({
            where: {
                id: adminId,
            },
        });

        if (!adminData) {
            resPayload.setError("Admin not found");
            return res.status(404).json(resPayload);
        }

        const updateAdmin = await prismaClient.admin.update({
            where: {
                id: adminId,
            },
            data: adminUpdateData,
        });
        resPayload.setSuccess("Admin updated successfully", updateAdmin);
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};
export default updateAdmin;
