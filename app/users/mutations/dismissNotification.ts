import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number()),
  async (notificationId) => {
    await db.notification.deleteMany({ where: { id: notificationId } })
  }
)
