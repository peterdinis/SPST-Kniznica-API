/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "email" SET DEFAULT 'foo@gmail.com';

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" SET DEFAULT 'foo@gmail.com';

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "email" SET DEFAULT 'foo@gmail.com';

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
