/*
  Warnings:

  - You are about to drop the `UserAvatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAvatar" DROP CONSTRAINT "UserAvatar_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePic" TEXT;

-- DropTable
DROP TABLE "UserAvatar";
