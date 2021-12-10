import { resolver } from 'blitz'
import db from 'db'

const SEVEN_DAYS_IN_MILLIS = 604_800_000

export default resolver.pipe(resolver.authorize(), async ({ ...props }, ctx) => {
  const userMembershipsWithCourse = await db.user.findFirst({
    where: { id: ctx.session.$publicData.userId },
    select: {
      courseMemberships: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  profilePicture: true
                }
              },
              posts: {
                where: {
                  createdAt: {
                    gte: new Date(Date.now() - SEVEN_DAYS_IN_MILLIS)
                  }
                },
                orderBy: { createdAt: 'asc' }
              }
            }
          }
        }
      }
    }
  })
  const x = userMembershipsWithCourse?.courseMemberships[0]?.course.posts[0]

  return userMembershipsWithCourse?.courseMemberships.map((m) => m.course) || null
})
