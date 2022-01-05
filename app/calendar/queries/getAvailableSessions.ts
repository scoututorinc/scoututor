import { Ctx, resolver } from 'blitz'
import db from 'db'

const convertDay = (day: string) => {
  return {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5
  }[day]
}

const convertTime = (time: Date) => {
  return time.getHours().toString() + ':' + time.getMinutes().toString()
}

export default resolver.pipe(resolver.authorize(), async (_, ctx: Ctx) => {
  const vanilla_sessions = await db.availableSession.findMany({
    where: { userId: ctx.session.userId! },
    select: {
      day: true,
      startTime: true,
      endTime: true
    }
  })
  console.log(vanilla_sessions)
  return vanilla_sessions.map((session) => {
    return {
      title: 'Free block',
      startTime: convertTime(session.startTime),
      endTime: convertTime(session.endTime),
      daysOfWeek: [convertDay(session.day)]
    }
  })
})