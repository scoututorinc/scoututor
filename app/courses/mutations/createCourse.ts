import { resolver } from 'blitz'
import db from 'db'
import { CreateCourseInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateCourseInput),
  async ({ discipline, knowledgeAreas, ...props }, ctx) => {
    return await db.course.create({
      data: {
        ...props,
        discipline: { connect: { name: discipline } },
        knowledgeAreas: { connect: { ...knowledgeAreas.map((k: string) => ({ name: k })) } },
        author: { connect: { id: ctx.session.$publicData.userId } }
      }
    })
  }
)
