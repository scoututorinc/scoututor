/*
  Warnings:

  - Added the required column `district` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipality` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "municipality" TEXT NOT NULL;
