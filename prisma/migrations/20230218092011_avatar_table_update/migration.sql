/*
  Warnings:

  - You are about to drop the column `source` on the `UserAvatar` table. All the data in the column will be lost.
  - Added the required column `sourceUrl` to the `UserAvatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAvatar" DROP COLUMN "source",
ADD COLUMN     "sourceUrl" TEXT NOT NULL;
