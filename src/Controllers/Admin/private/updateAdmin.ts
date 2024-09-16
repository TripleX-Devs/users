import prismaClient from "@/config/db";
import type express from "express";

const updateAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const adminUpdateData = req.body;
        const adminId = req.params.id;

        if (!adminId) {
            return res.status(400).json({ message: "Admin id is required" });
        }
        if (!adminUpdateData || Object.keys(adminUpdateData).length === 0) {
            return res.status(400).json({ message: "Update data is required" });
        }
        const adminData = await prismaClient.admin.findFirst({
            where: {
                id: adminId,
            },
        });

        if (!adminData) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const updateAdmin = await prismaClient.admin.update({
            where: {
                id: adminId,
            },
            data: adminUpdateData,
        });
        return res.status(200).json({
            message: "Admin updated successfully",
            admin: updateAdmin,
        });
    } catch (err) {
        next(err);
    }
};
export default updateAdmin;
