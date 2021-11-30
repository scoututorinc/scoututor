import { resolver } from 'blitz'
import db from 'db'
import { CourseCreation } from 'app/courses/validations'

export default resolver.pipe(
  resolver.zod(CourseCreation),
  async ({ name, description, hourlyRate }, ctx) => {
    //const course = await db.course.create({
    //   data: {
    //     name: name,
    //     description: description,
    //     hourlyRate: hourlyRate
    //   }
    // })
  }
)
