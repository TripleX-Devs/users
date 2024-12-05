/*
  Warnings:

  - A unique constraint covering the columns `[profilePicUrl]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profilePicUrl]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profilePicUrl]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profilePicUrl` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicUrl` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicUrl` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "profilePicUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "profilePicUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "profilePicUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OutboxEvent" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profilePicUrl_key" ON "Admin"("profilePicUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Student_profilePicUrl_key" ON "Student"("profilePicUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_profilePicUrl_key" ON "Teacher"("profilePicUrl");
