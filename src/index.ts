import express from "express";

const PORT = process.env.PORT || 3001;
const app = express();
import adminRoutes from "@/Routes/Admin/AdminRoutes";
import adminTeacherRoutes from "@/Routes/Admin/TeacherAddRoutes";
import teacherRoutes from "@/Routes/Teacher/TeacherRoutes";
import studentRoutes from "@/Routes/Student/StudentRoutes";
import adminStudentRoutes from "@/Routes/Admin/StudentAddRoutes";

import { errorMiddleware } from "@/middlewares/errorHandling";
import cookieParser from "cookie-parser";


// middlewares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.get("/", (req, res) => {
        res.send("Welcome to api set up by node-nitro ^_+");
    });
}

// admin routes

app.use("/admin", adminRoutes);

// app.use(checkForAccessToken);
app.use("/admin/teacher", adminTeacherRoutes);
app.use("/admin/student", adminStudentRoutes);



// for student route
app.use("/teacher", teacherRoutes);


// for student route
app.use("/student",studentRoutes );

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.info(`-> now listening at http://localhost:${PORT}/`);
});
