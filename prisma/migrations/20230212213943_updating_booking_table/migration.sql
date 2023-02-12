/*
  Warnings:

  - You are about to drop the column `days` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `from` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "days",
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
