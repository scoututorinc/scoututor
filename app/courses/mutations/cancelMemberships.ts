import { Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number()),
  async (id, ctx: Ctx) => {
    const courseMembership = await db.courseMembership.findMany({ where: { courseId: id } })

    courseMembership.forEach(async (courseMembership) => {
      const courseId = courseMembership ? courseMembership.courseId : -1
      const userId = courseMembership ? courseMembership.userId : -1
      await db.notification.create({
        data: {
          type: 'MEMBERSHIP',
          courseId: courseId,
          userId: userId,
          entityId: id
        }
      })
    })

    await db.courseMembership.deleteMany({ where: { courseId: id } })
  }
)
