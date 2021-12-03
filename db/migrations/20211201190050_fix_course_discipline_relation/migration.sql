/*
  Warnings:

  - You are about to drop the `_CourseToDiscipline` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplineId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToDiscipline" DROP CONSTRAINT "_CourseToDiscipline_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToDiscipline" DROP CONSTRAINT "_CourseToDiscipline_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CourseToDiscipline";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
