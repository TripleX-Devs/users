import addTeacherData from "@/Controllers/Admin/private/TeacherAddData/addTeacher";
import addTeachersDataBulk from "@/Controllers/Admin/private/TeacherAddData/addTeacherBulk";
import deleteTeacher from "@/Controllers/Admin/private/TeacherAddData/TeacherDelete";
import updateOneTeacherData from "@/Controllers/Admin/private/TeacherAddData/TeacherUpdate";
import updateBulkTeacherData from "@/Controllers/Admin/private/TeacherAddData/TeacherUpdateBulk";
import { checkForAccessToken } from "@/middlewares/authToken";
import { checkIdAdmin } from "@/middlewares/checkIdAdmin";
import { checkRole } from "@/middlewares/checkRole";
import { validateRequest } from "@/middlewares/validationFunction";
import { teacherUpdateSchema } from "@/Validation/Teacher/SchemaValidation";

import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.use(checkForAccessToken)
router.use(checkRole("admin"))

router.post("/addTeacherInBulk", upload.single("file"), addTeachersDataBulk);
router.post(
    "/addOneTeacher",
    validateRequest(teacherUpdateSchema),
    addTeacherData,
);
router.delete("/deleteTeacher/:id", deleteTeacher);
router.put(
    "/updateOneTeacher/:id",
    validateRequest(teacherUpdateSchema),
    updateOneTeacherData,
);

router.put('/updateTeacherInBulk', upload.single("file"), updateBulkTeacherData);
export default router;
