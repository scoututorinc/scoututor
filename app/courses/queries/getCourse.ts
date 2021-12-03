import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    return await db.course.findUnique({
      where: { id },
      include: { author: { select: { name: true, profilePicture: true } }, reviews: true }
    })
  }
)
