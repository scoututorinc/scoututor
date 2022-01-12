import { Ctx, resolver } from 'blitz'
import db from 'db'
import { dateToHourMinString } from 'utils'
import { z } from 'zod'

const convertDay = (day: string) => {
  return {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5
  }[day]
}

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const vanilla_sessions = await db.availableSession.findMany({
    where: { userId: ctx.session.userId, courseMembershipId: { not: null } },
    select: {
      day: true,
      startTime: true,
      endTime: true
    }
  })
  return vanilla_sessions.map((session) => {
    return {
      title: 'Free block',
      startTime: dateToHourMinString(session.startTime),
      endTime: dateToHourMinString(session.endTime),
      daysOfWeek: [convertDay(session.day)],
      color: 'green'
    }
  })
})
