import type express from "express";
import prismaClient from "@/config/db";
import jwt  from "jsonwebtoken";
const getAdminDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
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
            throw new Error("Admin not found");
        }

        return res
            .status(200)
            .json({ message: "Admin details", data: adminData });
    } catch (err) {
        next(err);
    }
};

export default getAdminDetails;
