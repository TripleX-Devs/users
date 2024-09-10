-- CreateEnum
CREATE TYPE "Country" AS ENUM ('IN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GENERAL', 'OBC', 'SC', 'ST');

-- CreateTable
CREATE TABLE "Student" (
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "universityRegistrationNumber" TEXT NOT NULL,
    "admissionNumber" TEXT,
    "universityName" TEXT NOT NULL,
    "universityEmail" TEXT NOT NULL,
    "universityEmailPassword" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "batchYear" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "hostelFacility" BOOLEAN NOT NULL,
    "dateOfAdmission" TIMESTAMP(3) NOT NULL,
    "receiptNumber" TEXT,
    "tenthBoardName" TEXT NOT NULL,
    "tenthMaxMarks" SMALLINT NOT NULL,
    "tenthObtainedMarks" SMALLINT NOT NULL,
    "tenthpercentage" DOUBLE PRECISION NOT NULL,
    "tenthSchoolName" TEXT NOT NULL,
    "twelthBoardName" TEXT NOT NULL,
    "twelthMaxMarks" SMALLINT NOT NULL,
    "twelthObtainedMarks" SMALLINT NOT NULL,
    "twelthpercentage" DOUBLE PRECISION NOT NULL,
    "twelthSchoolName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherOccupation" TEXT NOT NULL,
    "fatherPhoneNumber" TEXT NOT NULL,
    "fatherEmail" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherOccupation" TEXT,
    "motherPhoneNumber" TEXT NOT NULL,
    "motherEmail" TEXT,
    "guardianName" TEXT,
    "guardianOccupation" TEXT,
    "guardianPhoneNumber" TEXT,
    "guardianEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollNo")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "password" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "universityEmail" TEXT NOT NULL,
    "universityEmailPassword" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "password" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "universityEmail" TEXT NOT NULL,
    "universityEmailPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_key" ON "Student"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumber_key" ON "Student"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_universityRegistrationNumber_key" ON "Student"("universityRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_admissionNumber_key" ON "Student"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_universityEmail_key" ON "Student"("universityEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phoneNumber_key" ON "Teacher"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_universityEmail_key" ON "Teacher"("universityEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_universityEmail_key" ON "Admin"("universityEmail");
