import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  return await db.course.findMany({
    where: {
      usersEnrolled: { none: { userId: ctx.session.userId } },
      author: {
        id: { not: ctx.session.userId },
        availableSessions: { some: { courseMembership: null } }
      }
    },
    include: {
      author: { select: { name: true, district: true, municipality: true, profilePicture: true } }
    }
  })
})
