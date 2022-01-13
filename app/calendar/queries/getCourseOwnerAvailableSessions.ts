import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number()),
  async (courseId, ctx) => {
    const course = await db.course.findFirst({
      where: { id: courseId },
      select: {
        author: { select: { availableSessions: { where: { courseMembershipId: null } } } }
      }
    })

    return course?.author.availableSessions
  }
)
