import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CancelMembershipInput } from '../validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CancelMembershipInput),
  async ({ userId, courseId }, ctx) => {
    const courseMembership = await db.courseMembership.delete({
      where: { userId_courseId: { userId, courseId } },
      select: { id: true, userId: true, course: { select: { id: true, authorId: true } } }
    })

    try {
      await db.notification.create({
        data: {
          type: 'MEMBERSHIP_LEAVE',
          courseId: courseMembership.course.id,
          userId: courseMembership.course.authorId,
          entityId: courseMembership.userId
        }
      })
    } catch (e) {
      console.log(`Error creating notif on cancel Membership`, e)
    }
  }
)
