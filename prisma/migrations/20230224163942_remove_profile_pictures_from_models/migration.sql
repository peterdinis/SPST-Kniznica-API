/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "profilePicture";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "profilePicture";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "profilePicture";
