import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    return await db.course.findFirst({
      where: { id },
      include: {
        applications: {
          where: { status: 'PENDING' },
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
        }
      }
    })
  }
)
