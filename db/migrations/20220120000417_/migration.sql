/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `CourseMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseMembership_userId_courseId_key" ON "CourseMembership"("userId", "courseId");
