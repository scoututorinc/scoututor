import { resolver } from 'blitz'
import db from 'db'
import { CoursePost } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CoursePost),
  async ({ courseId, title, description, files }, ctx) => {
    return await db.post.create({
      data: {
        courseId,
        title,
        description,
        files: { createMany: { data: files } },
        authorId: ctx.session.$publicData.userId
      }
    })
  }
)
