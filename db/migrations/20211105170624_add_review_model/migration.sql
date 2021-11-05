-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPassword" DROP NOT NULL,
ALTER COLUMN "profilePicture" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CourseReview" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "CourseReview_pkey" PRIMARY KEY ("courseId","authorId")
);

-- AddForeignKey
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
