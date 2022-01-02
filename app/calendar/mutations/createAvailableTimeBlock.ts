import { resolver } from 'blitz'
import db from 'db'
import { TimeBlock } from 'app/calendar/validations'

const stringToDate = (timeString) => {
  return new Date(1970, 1, 1, timeString.split(':').at(0), timeString.split(':').at(1))
}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(TimeBlock),
  async ({ day, startTime, endTime }, ctx) => {
    await db.availableSession.create({
      data: {
        day: day,
        startTime: stringToDate(startTime),
        endTime: stringToDate(endTime),
        userId: ctx.session.userId!
      }
    })
  }
)
