/*
  Warnings:

  - You are about to drop the column `previewImages` on the `Course` table. All the data in the column will be lost.
  - Added the required column `previewImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('HIDDEN', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "previewImages",
ADD COLUMN     "previewImage" TEXT NOT NULL,
ADD COLUMN     "status" "CourseStatus" NOT NULL;
