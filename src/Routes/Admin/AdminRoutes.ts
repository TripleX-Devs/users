import express from "express";

const router = express.Router();

// import controller
import { validateRequest } from "@/middlewares/validationFunction";

import adminSignUp from "@/Controllers/Admin/protected/signUpAdmin";
import {
    signUpSchemaValidation,
    updateAdminSchemaValidation,
} from "@/Validation/Admin/SchemaValidation";

import adminSignIn from "@/Controllers/Admin/public/signInAdmin";
import { signInSchemaValidation } from "@/Validation/Admin/SchemaValidation";
import { checkForAccessToken } from "@/middlewares/authToken";
import getAdminDetails from "@/Controllers/Admin/private/admin/getAdmin";
import deleteAdmin from "@/Controllers/Admin/private/admin/deleteAdmin";
import updateAdmin from "@/Controllers/Admin/private/admin/updateAdmin";
import getAllTeachers from "@/Controllers/Admin/private/admin/getAllTeacher";
import { checkRole } from "@/middlewares/checkRole";
import { checkIdAdmin } from "@/middlewares/checkIdAdmin";
import getAllStudents from "@/Controllers/Admin/private/admin/getAllStudent";

router.post("/signup", validateRequest(signUpSchemaValidation), adminSignUp);

router.post("/login", validateRequest(signInSchemaValidation), adminSignIn);

// middleware for checking if the user is authenticated
router.use(checkForAccessToken);
router.use(checkRole("admin"));

router.get("/getAdminData",getAdminDetails);
router.put("/update",validateRequest(updateAdminSchemaValidation),updateAdmin);
router.delete("/delete",deleteAdmin);

router.get("/getAllTeachers",getAllTeachers)
router.get("/getAllStudents",getAllStudents)

export default router;
