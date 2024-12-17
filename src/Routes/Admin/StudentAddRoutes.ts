
import addStudentData from "@/Controllers/Admin/private/StudentAddData/addStudent";
import addStudentsDataBulk from "@/Controllers/Admin/private/StudentAddData/addStudentBulk";
import deleteStudent from "@/Controllers/Admin/private/StudentAddData/deleteStudent";
import updateOneStudentData from "@/Controllers/Admin/private/StudentAddData/updateStudent";
import { checkForAccessToken } from "@/middlewares/authToken";
import { checkIdAdmin } from "@/middlewares/checkIdAdmin";
import { checkRole } from "@/middlewares/checkRole";
import { validateRequest } from "@/middlewares/validationFunction";
import { studentSignInSchemaValidation, studentSignUpSchemaValidation, studentUpdateSchemaValidation } from "@/Validation/Student/SchemaValidation";
import express from "express";
const router = express.Router();


router.use(checkForAccessToken)
router.use(checkRole("admin"))

router.post("/addOneStudent",validateRequest(studentSignUpSchemaValidation) ,addStudentData)
router.delete("/deleteStudent/:rollNo",deleteStudent);
router.put("/updateStudent/:rollNo",validateRequest(studentUpdateSchemaValidation),updateOneStudentData);
router.post("/addStudentInBulk",(req,res) => {
    return res.json({message : "data in bulk processed"})
});



export default router;