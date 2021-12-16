import { resolver } from 'blitz'
import db from 'db'
import { CreateCourseApplicationMessage } from 'app/courses/validations'

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

    await db.courseApplication.update({
      where: { id: applicationId },
      data: {
        messages: {
          connect: { id: applicationMessage.id }
        }
      }
    })

    return applicationMessage
  }
)
