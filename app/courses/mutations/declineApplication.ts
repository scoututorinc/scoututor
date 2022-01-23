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
    await db.courseApplication.update({ where: { id }, data: { status: 'REJECTED' } })

    await db.notification.create({
      data: {
        type: 'APPLICATION_DECLINE',
        courseId: courseId,
        ownerId: userId,
        creatorId: ctx.session.userId,
        entityId: id
      }
    })
  }
)
