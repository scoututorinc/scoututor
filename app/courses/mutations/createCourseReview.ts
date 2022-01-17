import { resolver } from 'blitz'
import db from 'db'
import { CreateCourseReview } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateCourseReview),
  async ({ classification, comment, courseId }, ctx) => {
    return await db.courseReview.create({
      data: {
        rating: classification,
        content: comment,
        courseId: courseId,
        authorId: ctx.session.userId
      }
    })
  }
)
