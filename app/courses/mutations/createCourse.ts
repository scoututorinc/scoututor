import { resolver } from 'blitz'
import db from 'db'
import { CreateCourseInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateCourseInput.required()),
  async ({ discipline, knowledgeAreas, ...props }, ctx) => {
    const disciplineId = (
      await db.discipline.findFirst({
        where: { name: discipline },
        select: { id: true }
      })
    )?.id as number
    return await db.course.create({
      data: {
        ...props,
        discipline: { connect: { id: disciplineId } },
        knowledgeAreas: {
          connect: knowledgeAreas.map((k: string) => ({
            name_disciplineId: {
              name: k,
              disciplineId
            }
          }))
        },
        author: { connect: { id: ctx.session.$publicData.userId } }
      }
    })
  }
)
