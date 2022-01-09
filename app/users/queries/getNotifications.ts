import { Ctx } from 'blitz'
import db from 'db'

export default async function getNotifications(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const notifications = await db.notification.findMany({
    where: { userId: session.userId }
  })
  return notifications
}
