import { resolver } from 'blitz'
import { CourseApplication } from 'app/courses/validations'

export default resolver.pipe(
  resolver.zod(CourseApplication),
  async ({ interest_manifestation_and_questions, availability }, ctx) => {
    // const application = await db.courseApplication.create({
    //   data: {
    //     description: interest_manifestation_and_questions.trim(),
    //     availableSchedule: availability
    //   }
    // })
  }
)
