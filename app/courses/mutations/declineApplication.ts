import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    await db.courseApplication.update({ where: { id }, data: { status: 'REJECTED' } })
  }
)
