import { Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int()),
  async (userId, ctx: Ctx) => {
    const user = await db.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        profilePicture: true,
        email: true,
        role: true,
        district: true,
        municipality: true
      }
    })

    return user
  }
)
