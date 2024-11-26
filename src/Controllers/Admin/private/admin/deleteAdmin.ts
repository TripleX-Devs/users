import type express from "express";
import prismaClient from "@/config/db";
import ResponsePayload from "@/utils/resGenerator";
import jwt from "jsonwebtoken";
const deleteAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    
    const funcName= "deleteAdmin";
    const resPayload = new ResponsePayload();
    try {

        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as { sub: string; rollType: string; userData: { name: string; universityEmail: string } };


        const adminId = decoded.sub;

        const adminData = await prismaClient.admin.findUnique({
            where: {
                id: adminId,
            },
        });
        if (!adminData) {
            resPayload.setError("Admin not found");
            console.log(resPayload, `-> response for ${funcName} controller`);
            return res.status(404).json(resPayload);
        }

        await prismaClient.admin.delete({
            where: {
                id: adminId,
            },
        });
        console.log(resPayload, `-> response for ${funcName} controller`);
        resPayload.setSuccess("Admin deleted successfully");
        return res.status(200).json(resPayload);
    } catch (err) {
        next(err);
    }
};
export default deleteAdmin;
