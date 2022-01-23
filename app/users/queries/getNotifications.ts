import { Ctx } from 'blitz'
import db from 'db'

export default async function getNotifications(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const notifications = await db.notification.findMany({
    where: { ownerId: session.userId },
    select: {
      id: true,
      createdAt: true,
      type: true,
      course: true,
      entityId: true,
      creator: { select: { id: true, name: true } }
    }
  })
  return notifications
}
