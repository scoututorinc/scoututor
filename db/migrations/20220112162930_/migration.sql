/*
  Warnings:

  - You are about to drop the `WeeklySession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeeklySession" DROP CONSTRAINT "WeeklySession_availableSessionId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklySession" DROP CONSTRAINT "WeeklySession_courseMembershipId_fkey";

-- AlterTable
ALTER TABLE "AvailableSession" ADD COLUMN     "courseMembershipId" INTEGER;

-- DropTable
DROP TABLE "WeeklySession";

-- AddForeignKey
ALTER TABLE "AvailableSession" ADD CONSTRAINT "AvailableSession_courseMembershipId_fkey" FOREIGN KEY ("courseMembershipId") REFERENCES "CourseMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
