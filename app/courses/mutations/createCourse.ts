import { resolver } from 'blitz'
import db from 'db'
import { CreateCourseInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateCourseInput),
  async ({ ...props }, ctx) => {
    return await db.course.create({
      data: {
        ...props,
        authorId: ctx.session.$publicData.userId
      }
    })
  }
)
