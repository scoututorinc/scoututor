import { Ctx } from 'blitz'
import db from 'db'

export default async function getCurrentUserCreatedCourses(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const applications = await db.courseApplication.findMany({
    where: { applicantId: session.userId },
    select: {
      id: true,
      description: true,
      availableSessions: true,
      applicantId: true,
      applicant: { select: { id: true, name: true, profilePicture: true } },
      courseId: true,
      messages: {
        select: {
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              profilePicture: true
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  return applications
}
