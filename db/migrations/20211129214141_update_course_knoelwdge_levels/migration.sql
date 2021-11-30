/*
  Warnings:

  - You are about to drop the column `levels` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "levels",
ADD COLUMN     "knowledgeLevels" "KnowledgeLevel"[];
