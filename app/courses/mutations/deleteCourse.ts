import { Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number()),
  async (id, ctx: Ctx) => {
    return await db.course.delete({
      where: { id }
    })
  }
)
