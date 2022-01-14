import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const userKnowledgeAreas = await db.user.findFirst({
    where: { id: ctx.session.$publicData.userId },
    select: {
      courseMemberships: {
        select: {
          course: { select: { knowledgeAreas: { select: { name: true } } } }
        }
      }
    }
  })

  const knowledgeAreasEnrolled = userKnowledgeAreas?.courseMemberships.flatMap((cm) =>
    cm.course.knowledgeAreas.map((ka) => ka.name)
  )

  const coursesMatching = await db.course.findMany({
    where: {
      knowledgeAreas: {
        some: {
          name: {
            in: knowledgeAreasEnrolled
          }
        }
      },
      usersEnrolled: {
        none: { userId: ctx.session.userId }
      }
    },
    include: {
      author: { select: { name: true, profilePicture: true } },
      usersEnrolled: true
    }
  })

  return coursesMatching?.splice(Math.floor(Math.random() * (coursesMatching.length - 4)), 4)
})
