import express from "express";

const router = express.Router();

// import controller
import { validateRequest } from "@/middlewares/validationFunction";

import adminSignUp from "@/Controllers/Admin/protected/signUpAdmin";
import { signUpSchemaValidation } from "@/Validation/Admin/SchemaValidation";

import adminSignIn from "@/Controllers/Admin/public/signInAdmin";
import { signInSchemaValidation } from "@/Validation/Admin/SchemaValidation";
import { checkForAccessToken } from "@/middlewares/authToken";
import getAdminDetails from "@/Controllers/Admin/private/getAdmin";
import deleteAdmin from "@/Controllers/Admin/private/deleteAdmin";
import updateAdmin from "@/Controllers/Admin/private/updateAdmin";

router.post("/signup", validateRequest(signUpSchemaValidation), adminSignUp);

router.post("/login", validateRequest(signInSchemaValidation), adminSignIn);

// middleware for checking if the user is authenticated
router.use(checkForAccessToken);

router.get("/getAdminData/:id", getAdminDetails);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);

export default router;
