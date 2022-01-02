/*
  Warnings:

  - Added the required column `availableSessionId` to the `WeeklySession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeeklySession" ADD COLUMN     "availableSessionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AvailableSession" (
    "id" SERIAL NOT NULL,
    "day" "WeekDay" NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseApplicationId" INTEGER,

    CONSTRAINT "AvailableSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklySession" ADD CONSTRAINT "WeeklySession_availableSessionId_fkey" FOREIGN KEY ("availableSessionId") REFERENCES "AvailableSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableSession" ADD CONSTRAINT "AvailableSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableSession" ADD CONSTRAINT "AvailableSession_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
