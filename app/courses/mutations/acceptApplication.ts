import { resolver } from 'blitz'
import db from 'db'
import { CourseAcceptance } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseAcceptance),
  async ({ applicationId, applicantId, courseId }, ctx) => {
    //TODO: Checkar colisões de horário
    const application = await db.courseApplication.update({
      where: { id: applicationId },
      data: { status: 'ACCEPTED' },
      include: { availableSessions: true }
    })

    const membership = await db.courseMembership.create({
      data: {
        weeklyHours: -1,
        weeklySessions: { connect: application.availableSessions.map((s) => ({ id: s.id })) },
        userId: applicantId,
        courseId: courseId
      }
    })

    await db.notification.create({
      data: {
        type: 'APPLICATION_ACCEPT',
        courseId: courseId,
        ownerId: applicantId,
        creatorId: ctx.session.userId,
        entityId: membership.id
      }
    })

    return membership
  }
)
