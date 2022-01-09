import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(resolver.authorize(), async () => {
  await db.notification.deleteMany()
})
