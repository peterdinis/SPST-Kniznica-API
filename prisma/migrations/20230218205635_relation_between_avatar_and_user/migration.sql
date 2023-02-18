/*
  Warnings:

  - You are about to drop the column `sourceUrl` on the `UserAvatar` table. All the data in the column will be lost.
  - Added the required column `source` to the `UserAvatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserAvatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAvatar" DROP COLUMN "sourceUrl",
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAvatar" ADD CONSTRAINT "UserAvatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
