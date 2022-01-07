/*
  Warnings:

  - You are about to drop the column `courseApplicationId` on the `AvailableSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[availableSessionId]` on the table `WeeklySession` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AvailableSession" DROP CONSTRAINT "AvailableSession_courseApplicationId_fkey";

-- AlterTable
ALTER TABLE "AvailableSession" DROP COLUMN "courseApplicationId";

-- CreateTable
CREATE TABLE "_AvailableSessionToCourseApplication" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AvailableSessionToCourseApplication_AB_unique" ON "_AvailableSessionToCourseApplication"("A", "B");

-- CreateIndex
CREATE INDEX "_AvailableSessionToCourseApplication_B_index" ON "_AvailableSessionToCourseApplication"("B");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklySession_availableSessionId_key" ON "WeeklySession"("availableSessionId");

-- AddForeignKey
ALTER TABLE "_AvailableSessionToCourseApplication" ADD FOREIGN KEY ("A") REFERENCES "AvailableSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvailableSessionToCourseApplication" ADD FOREIGN KEY ("B") REFERENCES "CourseApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
