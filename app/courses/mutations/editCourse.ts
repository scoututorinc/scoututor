import { resolver } from 'blitz'
import db from 'db'
import { UpdateCourseInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateCourseInput),
  async ({ id, discipline, knowledgeAreas, ...props }, ctx) => {
    const disciplineId = (
      await db.discipline.findFirst({
        where: { name: discipline },
        select: { id: true }
      })
    )?.id as number
    return await db.course.update({
      where: { id },
      data: {
        ...props,
        knowledgeAreas: {
          set: knowledgeAreas?.map((k: string) => ({
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
