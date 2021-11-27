/*
  Warnings:

  - You are about to drop the column `icon` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discipline` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KnowledgeLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FIRSTCYCLE', 'SECONDCYCLE', 'THIRDCYCLE', 'SECONDARY', 'BACHELOR', 'MASTER');

-- CreateEnum
CREATE TYPE "TeachingMethod" AS ENUM ('ONLINE', 'PRESENTIAL');

-- DropIndex
DROP INDEX "Course_name_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "icon",
DROP COLUMN "name",
ADD COLUMN     "discipline" TEXT NOT NULL,
ADD COLUMN     "level" "KnowledgeLevel" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "zone" "TeachingMethod"[];

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_key" ON "Course"("title");
