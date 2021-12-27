import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  return await db.course.findMany({
    include: {
      author: { select: { name: true, district: true, municipality: true, profilePicture: true } }
    }
  })
})
