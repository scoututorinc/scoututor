/*
  Warnings:

  - You are about to drop the column `userId` on the `courseApplicationMessage` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `courseApplicationMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courseApplicationMessage" DROP CONSTRAINT "courseApplicationMessage_userId_fkey";

-- AlterTable
ALTER TABLE "courseApplicationMessage" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "courseApplicationMessage" ADD CONSTRAINT "courseApplicationMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
