/*
  Warnings:

  - You are about to drop the column `discipline` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `knowledgeAreas` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "discipline",
DROP COLUMN "knowledgeAreas";

-- CreateTable
CREATE TABLE "Discipline" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeArea" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "diciplineId" INTEGER NOT NULL,

    CONSTRAINT "KnowledgeArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToDiscipline" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToKnowledgeArea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_name_key" ON "Discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeArea_name_key" ON "KnowledgeArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToDiscipline_AB_unique" ON "_CourseToDiscipline"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToDiscipline_B_index" ON "_CourseToDiscipline"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToKnowledgeArea_AB_unique" ON "_CourseToKnowledgeArea"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToKnowledgeArea_B_index" ON "_CourseToKnowledgeArea"("B");

-- AddForeignKey
ALTER TABLE "KnowledgeArea" ADD CONSTRAINT "KnowledgeArea_diciplineId_fkey" FOREIGN KEY ("diciplineId") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToDiscipline" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToDiscipline" ADD FOREIGN KEY ("B") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToKnowledgeArea" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToKnowledgeArea" ADD FOREIGN KEY ("B") REFERENCES "KnowledgeArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
