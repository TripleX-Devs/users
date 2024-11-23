import express from "express";

const router = express.Router();

// import controller

import { validateRequest } from "@/middlewares/validationFunction";
import { studentSignInSchemaValidation, studentUpdateSchemaValidation } from "@/Validation/Student/SchemaValidation";
import studentSignIn from "@/Controllers/Student/studentSignIn";
import { checkForAccessToken } from "@/middlewares/authToken";
import getStudentDetails from "@/Controllers/Student/getStudentDetails";
import updateStudent from "@/Controllers/Student/updateStudent";
import { checkRole } from "@/middlewares/checkRole";
import { checkRollNumber } from "@/middlewares/checkRollNumber";



router.post("/signinStudent", validateRequest(studentSignInSchemaValidation),studentSignIn );

router.use(checkForAccessToken);
router.use(checkRole("student"));

router.get("/getStudentData/:rollNo",checkRollNumber, getStudentDetails);
router.put("/studentUpdate/:rollNo",checkRollNumber,validateRequest(studentUpdateSchemaValidation), updateStudent);

export default router;