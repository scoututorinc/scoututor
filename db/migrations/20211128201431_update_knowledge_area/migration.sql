/*
  Warnings:

  - You are about to drop the column `diciplineId` on the `KnowledgeArea` table. All the data in the column will be lost.
  - Added the required column `disciplineId` to the `KnowledgeArea` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KnowledgeArea" DROP CONSTRAINT "KnowledgeArea_diciplineId_fkey";

-- AlterTable
ALTER TABLE "KnowledgeArea" DROP COLUMN "diciplineId",
ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "KnowledgeArea" ADD CONSTRAINT "KnowledgeArea_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
