import { resolver } from 'blitz'
import db from 'db'
import { CourseAcceptance } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CourseAcceptance),
  async ({ applicationId, applicantId, courseId }) => {
    await db.courseApplication.update({
      where: { id: applicationId },
      data: { status: 'ACCEPTED' }
    })
    const membership = await db.courseMembership.create({
      data: {
        weeklyHours: -1,
        weeklySchedule: '|--|--|--|',
        userId: applicantId,
        courseId: courseId
      }
    })
  }
)
