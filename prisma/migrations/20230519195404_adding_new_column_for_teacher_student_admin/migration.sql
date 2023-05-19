-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isLogged" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "isLogged" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "isLogged" BOOLEAN NOT NULL DEFAULT false;
