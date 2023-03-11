-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "canAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "canAdmin" BOOLEAN NOT NULL DEFAULT false;
