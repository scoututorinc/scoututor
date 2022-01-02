import { resolver } from 'blitz'
import { TimeBlock } from 'app/calendar/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(TimeBlock),
  async ({ day, startTime, endTime }, ctx) => {
    console.log({ day, startTime, endTime })
  }
)
