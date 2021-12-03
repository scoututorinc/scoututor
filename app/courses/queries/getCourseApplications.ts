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
          select: {
            id: true,
            description: true,
            availableSchedule: true,
            applicantId: true,
            applicant: { select: { name: true, profilePicture: true } },
            courseId: true
          }
        }
      }
    })
  }
)
