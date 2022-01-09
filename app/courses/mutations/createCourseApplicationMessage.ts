import { resolver } from 'blitz'
import db from 'db'
import { CourseApplication, CreateCourseApplicationMessage } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateCourseApplicationMessage),
  async ({ applicationId, content }, ctx) => {
    const applicationMessage = await db.courseApplicationMessage.create({
      data: {
        courseApplicationId: applicationId,
        authorId: ctx.session.$publicData.userId,
        content
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    })

    const couseApplication = await db.courseApplication.update({
      where: { id: applicationId },
      data: {
        messages: {
          connect: { id: applicationMessage.id }
        }
      }
    })

    await db.notification.create({
      data: {
        type: 'APPLICATION_COMMENT',
        courseId: couseApplication.courseId,
        userId: couseApplication.applicantId,
        entityId: applicationMessage.id
      }
    })

    return applicationMessage
  }
)
