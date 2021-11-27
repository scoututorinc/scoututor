/*
  Warnings:

  - You are about to drop the column `level` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "level",
DROP COLUMN "method",
ADD COLUMN     "levels" "KnowledgeLevel"[],
ADD COLUMN     "methods" "TeachingMethod"[];
