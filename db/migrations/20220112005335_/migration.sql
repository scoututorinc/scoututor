/*
  Warnings:

  - You are about to drop the column `weeklySchedule` on the `CourseMembership` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeeklySession" DROP CONSTRAINT "WeeklySession_courseMembershipId_fkey";

-- AlterTable
ALTER TABLE "CourseMembership" DROP COLUMN "weeklySchedule";

-- AddForeignKey
ALTER TABLE "WeeklySession" ADD CONSTRAINT "WeeklySession_courseMembershipId_fkey" FOREIGN KEY ("courseMembershipId") REFERENCES "CourseMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
