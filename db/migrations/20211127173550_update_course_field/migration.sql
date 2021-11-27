/*
  Warnings:

  - You are about to drop the column `zone` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "zone",
ADD COLUMN     "method" "TeachingMethod"[];
