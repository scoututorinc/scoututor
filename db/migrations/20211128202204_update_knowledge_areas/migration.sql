/*
  Warnings:

  - A unique constraint covering the columns `[name,disciplineId]` on the table `KnowledgeArea` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "KnowledgeArea_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeArea_name_disciplineId_key" ON "KnowledgeArea"("name", "disciplineId");
