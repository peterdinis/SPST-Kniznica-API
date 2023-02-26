/*
  Warnings:

  - Added the required column `isTeacher` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTeacher` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "canCreate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canUpdate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isTeacher" BOOLEAN NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'FOO';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'FOO';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "canCreate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canUpdate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isTeacher" BOOLEAN NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'FOO',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'FOO';
