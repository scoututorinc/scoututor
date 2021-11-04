/*
  Warnings:

  - You are about to drop the column `enrolledAt` on the `CourseMembership` table. All the data in the column will be lost.
  - You are about to drop the `AvailableSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklySession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `availableSchedule` to the `CourseApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklySchedule` to the `CourseMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvailableSession" DROP CONSTRAINT "AvailableSession_courseApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklySession" DROP CONSTRAINT "WeeklySession_courseMembershipId_fkey";

-- AlterTable
ALTER TABLE "CourseApplication" ADD COLUMN     "availableSchedule" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseMembership" DROP COLUMN "enrolledAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "weeklySchedule" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "AvailableSession";

-- DropTable
DROP TABLE "WeeklySession";

-- CreateTable
CREATE TABLE "courseApplicationMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "courseApplicationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "courseApplicationMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courseApplicationMessage" ADD CONSTRAINT "courseApplicationMessage_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseApplicationMessage" ADD CONSTRAINT "courseApplicationMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
