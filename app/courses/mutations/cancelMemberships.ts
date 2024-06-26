import { Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(resolver.authorize(), resolver.zod(z.number()), async (id, ctx) => {
  const courseMembership = await db.courseMembership.findMany({ where: { courseId: id } })

  courseMembership.forEach(async (courseMembership) => {
    const courseId = courseMembership ? courseMembership.courseId : -1
    const userId = courseMembership ? courseMembership.userId : -1

    try {
      await db.notification.create({
        data: {
          type: 'MEMBERSHIP_CANCEL',
          courseId: courseId,
          ownerId: userId,
          creatorId: ctx.session.userId,
          entityId: id
        }
      })
    } catch (e) {
      console.log(`Error creating notif on cancel Membership`)
    }
  })

  await db.courseMembership.deleteMany({ where: { courseId: id } })
})
