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

    const courseApplication = await db.courseApplication.update({
      where: { id: applicationId },
      data: {
        messages: {
          connect: { id: applicationMessage.id }
        }
      },
      select: { applicantId: true, courseId: true, course: { select: { authorId: true } } }
    })

    let [ownerId, creatorId]: [number | null, number | null] = [null, null]

    if (ctx.session.userId == courseApplication.applicantId) {
      ownerId = courseApplication.course.authorId
      creatorId = courseApplication.applicantId
    } else {
      creatorId = courseApplication.course.authorId
      ownerId = courseApplication.applicantId
    }

    await db.notification.create({
      data: {
        type: 'APPLICATION_COMMENT',
        courseId: courseApplication.courseId,
        ownerId,
        creatorId,
        entityId: applicationMessage.id
      }
    })

    return applicationMessage
  }
)
