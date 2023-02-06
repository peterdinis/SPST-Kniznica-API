-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MEN', 'WOMEN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MEN';
