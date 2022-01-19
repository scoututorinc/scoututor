import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(resolver.authorize(), resolver.zod(z.number()), async (id, ctx) => {
  const courseMembership = await db.courseMembership.delete({
    where: { id: id },
    select: { course: { select: { id: true, authorId: true } } }
  })

  try {
    await db.notification.create({
      data: {
        type: 'MEMBERSHIP_CANCEL',
        courseId: courseMembership.course.id,
        userId: courseMembership.course.authorId,
        entityId: id
      }
    })
  } catch (e) {
    console.log(`Error creating notif on cancel Membership`)
  }
})
