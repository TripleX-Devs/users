import express from "express";

const router = express.Router();

// import controller
import getTeacherDetails from "@/Controllers/Teacher/getTeacherDetails";

import { validateRequest } from "@/middlewares/validationFunction";
import { signInSchemaValidation, teacherUpdateSchema } from "@/Validation/Teacher/SchemaValidation";
import teacherSignIn from "@/Controllers/Teacher/teacherSignin";
import { checkForAccessToken } from "@/middlewares/authToken";
import updateTeacher from "@/Controllers/Teacher/updateTeacher";
import { checkRole } from "@/middlewares/checkRole";
import { checkIdAdmin } from "@/middlewares/checkIdAdmin";
import { checkIdTeacher } from "@/middlewares/checkIdTeacher";



router.post("/signinTeacher", validateRequest(signInSchemaValidation),teacherSignIn );

router.use(checkForAccessToken);
router.use(checkRole("teacher"));
// router.use();
router.get("/getTeacherData",getTeacherDetails);
router.put("/teacherUpdate", validateRequest(teacherUpdateSchema) ,updateTeacher);

export default router;