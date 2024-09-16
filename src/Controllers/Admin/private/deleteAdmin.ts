import type express from "express";
import prismaClient from "@/config/db";
const deleteAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const adminId = req.params.id;

        const adminData = await prismaClient.admin.findUnique({
            where: {
                id: adminId,
            },
        });
        if (!adminData) {
            return res.status(404).json({ message: "Admin not found" });
        }

        await prismaClient.admin.delete({
            where: {
                id: adminId,
            },
        });
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        next(err);
    }
};
export default deleteAdmin;
