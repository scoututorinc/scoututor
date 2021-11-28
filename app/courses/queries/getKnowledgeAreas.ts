import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(resolver.authorize(), resolver.zod(z.string()), async (_, ctx) => {
  return await db.discipline.findMany({})
})
