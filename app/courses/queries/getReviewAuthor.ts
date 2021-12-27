import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    return await db.user.findUnique({
      where: { id },
      select: {
        name: true,
        profilePicture: true,
        district: true,
        municipality: true
      }
    })
  }
)
