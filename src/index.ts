import express from "express";
const cors = require('cors');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));



import adminRoutes from "@/Routes/Admin/AdminRoutes";
import adminTeacherRoutes from "@/Routes/Admin/TeacherAddRoutes";
import teacherRoutes from "@/Routes/Teacher/TeacherRoutes";
import studentRoutes from "@/Routes/Student/StudentRoutes";
import adminStudentRoutes from "@/Routes/Admin/StudentAddRoutes";
import refreshTokenRoute from '@/Routes/refreshTokenRoute'

import { errorMiddleware } from "@/middlewares/errorHandling";
import cookieParser from "cookie-parser";
import { startWorker, stopWorker } from "./worker";

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

app.use("/api/v1/admin", adminRoutes);

// app.use(checkForAccessToken);
app.use("/api/v1/admin/teacher", adminTeacherRoutes);
app.use("/api/v1/admin/student", adminStudentRoutes);



// for student route
app.use("/api/v1/teacher", teacherRoutes);


// for student route
app.use("/api/v1/student",studentRoutes );

// for refresh token

app.use('/refresh',refreshTokenRoute);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.info(`-> now listening at http://localhost:${PORT}/`);
    startWorker();
});


process.on("SIGTERM", () => {
    stopWorker();
    process.exit(0);
});

process.on("SIGINT", () => {
    stopWorker();
    process.exit(0);
});
