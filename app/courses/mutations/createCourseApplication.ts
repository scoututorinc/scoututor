import { resolver } from 'blitz'
import db from 'db'
import { CourseApplication } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseApplication),
  async ({ ...props }, ctx) => {
    const course = await db.course.findFirst({ where: { id: props.courseId } })

    const courseApplication = await db.courseApplication.create({
      data: {
        ...props,
        applicantId: ctx.session.$publicData.userId
      }
    })

    await db.notification.create({
      data: {
        type: 'APPLICATION_CREATE',
        courseId: props.courseId,
        userId: ctx.session.$publicData.userId,
        entityId: courseApplication.id
      }
    })
    return courseApplication
  }
)
