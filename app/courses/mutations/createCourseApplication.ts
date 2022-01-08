import { resolver } from 'blitz'
import db from 'db'
import { CourseApplication } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseApplication),
  async ({ description, availableSessions, courseId }, ctx) => {
    return await db.courseApplication.create({
      data: {
        description,
        course: { connect: { id: courseId } },
        applicant: { connect: { id: ctx.session.$publicData.userId } },
        availableSessions: { connect: availableSessions.map((s) => ({ id: s })) }
      }
    })
  }
)
