import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.string()),
  async (disciplineName, ctx) => {
    return await db.knowledgeArea.findMany({ where: { discipline: { name: disciplineName } } })
  }
)
