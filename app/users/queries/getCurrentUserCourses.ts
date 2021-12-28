import { Ctx } from 'blitz'
import db from 'db'

export default async function getCurrentUserCreatedCourses(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const courses = await db.course.findMany({
    where: { authorId: session.userId },
    select: { id: true, title: true, description: true }
  })

  return courses
}
