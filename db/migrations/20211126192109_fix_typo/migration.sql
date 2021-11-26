/*
  Warnings:

  - You are about to drop the `courseApplicationMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courseApplicationMessage" DROP CONSTRAINT "courseApplicationMessage_authorId_fkey";

-- DropForeignKey
ALTER TABLE "courseApplicationMessage" DROP CONSTRAINT "courseApplicationMessage_courseApplicationId_fkey";

-- DropTable
DROP TABLE "courseApplicationMessage";

-- CreateTable
CREATE TABLE "CourseApplicationMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "courseApplicationId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "CourseApplicationMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseApplicationMessage" ADD CONSTRAINT "CourseApplicationMessage_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseApplicationMessage" ADD CONSTRAINT "CourseApplicationMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
