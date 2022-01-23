import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id, ctx) => {
    const courseApplication = await db.courseApplication.findFirst({ where: { id } })
    const courseId = courseApplication ? courseApplication.courseId : -1
    const userId = courseApplication ? courseApplication.applicantId : -1
    await db.courseApplication.update({ where: { id }, data: { status: 'CANCELED' } })

    try {
      await db.notification.create({
        data: {
          type: 'APPLICATION_CANCEL',
          courseId: courseId,
          ownerId: userId,
          creatorId: ctx.session.userId,
          entityId: id
        }
      })
    } catch (e) {
      console.log(`Error creating notif on cancel Application`)
    }
  }
)
