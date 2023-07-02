-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "isDeactivated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "isDeactivated" BOOLEAN NOT NULL DEFAULT false;
