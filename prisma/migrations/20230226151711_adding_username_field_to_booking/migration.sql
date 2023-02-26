/*
  Warnings:

  - You are about to drop the column `email` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'FOO';
