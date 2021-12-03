import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.authorize(), async (_: any, ctx) => {
  return await db.user.delete({
    where: { id: ctx.session.$publicData.userId }
  })
})
