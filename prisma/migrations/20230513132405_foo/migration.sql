/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "publisher" SET DEFAULT 'Mladé Léta';

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "username" SET DEFAULT 'Custom user';

-- DropTable
DROP TABLE "File";
