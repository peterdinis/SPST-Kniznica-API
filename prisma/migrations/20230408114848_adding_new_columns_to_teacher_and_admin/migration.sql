-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true;
