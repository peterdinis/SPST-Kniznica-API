/*
  Warnings:

  - You are about to drop the column `canAdmin` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canCreate` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canDelete` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canUpdate` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `isTeacher` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `canAdmin` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `canCreate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `canDelete` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `canUpdate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `canAdmin` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `canCreate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `canDelete` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `canUpdate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `isTeacher` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "canAdmin",
DROP COLUMN "canCreate",
DROP COLUMN "canDelete",
DROP COLUMN "canUpdate",
DROP COLUMN "isTeacher";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "canAdmin",
DROP COLUMN "canCreate",
DROP COLUMN "canDelete",
DROP COLUMN "canUpdate";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "canAdmin",
DROP COLUMN "canCreate",
DROP COLUMN "canDelete",
DROP COLUMN "canUpdate",
DROP COLUMN "isTeacher";
