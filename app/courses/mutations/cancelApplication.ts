import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id, ctx) => {
    const courseApplication = await db.courseApplication.update({
      where: { id },
      data: { status: 'CANCELED' },
      select: { course: { select: { id: true, authorId: true } } }
    })

    try {
      await db.notification.create({
        data: {
          type: 'APPLICATION_CANCEL',
          courseId: courseApplication.course.id,
          ownerId: courseApplication.course.authorId,
          creatorId: ctx.session.userId,
          entityId: id
        }
      })
    } catch (e) {
      console.log(`Error creating notif on cancel Application`)
    }
  }
)
