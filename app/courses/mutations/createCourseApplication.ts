import { resolver } from 'blitz'
import db from 'db'
import { CourseApplication } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseApplication),
  async ({ ...props }, ctx) => {
    return await db.courseApplication.create({
      data: {
        ...props,
        applicantId: ctx.session.$publicData.userId
      }
    })
  }
)
