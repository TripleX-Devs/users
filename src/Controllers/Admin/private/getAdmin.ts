import type express from "express";
import prismaClient from "@/config/db";

const getAdminDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const adminId = req.params.id;
        console.log(adminId);
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
