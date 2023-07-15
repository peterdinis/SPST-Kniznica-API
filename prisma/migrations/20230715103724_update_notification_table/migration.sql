/*
  Warnings:

  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'Que';

-- DropTable
DROP TABLE "Email";
