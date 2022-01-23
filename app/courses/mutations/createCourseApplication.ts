import { resolver } from 'blitz'
import db from 'db'
import { CourseApplication } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseApplication),
  async ({ description, availableSessions, courseId }, ctx) => {
    const course = await db.course.findUnique({ where: { id: courseId } })
    if (course) {
      const courseApplication = await db.courseApplication.create({
        data: {
          description,
          course: { connect: { id: courseId } },
          applicant: { connect: { id: ctx.session.userId } },
          availableSessions: { connect: availableSessions.map((s) => ({ id: s })) }
        }
      })

      await db.notification.create({
        data: {
          type: 'APPLICATION_CREATE',
          courseId: courseId,
          ownerId: course.authorId,
          creatorId: ctx.session.userId,
          entityId: courseApplication.id
        }
      })
      return courseApplication
    } else throw new Error()
  }
)
