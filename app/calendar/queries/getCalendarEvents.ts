import { Ctx, resolver } from 'blitz'
import db from 'db'

const convertDays = (days_array: Array<string>) => {
  const correspondence = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5
  }
  return days_array.map((element: string) => correspondence[element])
}

const convertMinutes = (mins) => {
  if (mins < 10) {
    return '0' + mins.toString()
  }
  return mins.toString()
}

const convertTime = (time: Date) => {
  return time.getHours().toString() + ':' + convertMinutes(time.getMinutes())
}

const weeklySessionsFromMemberships = (memberships: Array<Record<string, any>>) => {
  return memberships.map((membership) => {
    return membership.weeklySession.map((session) => {
      return {
        title: membership.course.title,
        startTime: convertTime(session.startTime),
        endTime: convertTime(session.endTime),
        daysOfWeek: convertDays(session.days),
        color: 'red'
      }
    })
  })
}

export default resolver.pipe(resolver.authorize(), async (_, ctx: Ctx) => {
  const user = db.user.findFirst({ where: { id: ctx.session.userId! } })
  const events = [] as Array<Record<string, any>>
  // Courses in which the user is the student
  const courseMemberships = await db.courseMembership.findMany({
    where: { userId: ctx.session.userId! },
    include: {
      course: true,
      weeklySession: {
        select: {
          days: true,
          startTime: true,
          endTime: true
        }
      }
    }
  })
  const weeklySessions = weeklySessionsFromMemberships(courseMemberships)
  events.push(...weeklySessions.flat(1))
  // Courses in which the user is the teacher
  const tought_courses = await user.coursesCreated()
  const tought_courses_ids = tought_courses.map((course) => course.id)
  const memberships = await db.courseMembership.findMany({
    where: { id: { in: tought_courses_ids } }
  })
  const weeklyToughSessions = weeklySessionsFromMemberships(memberships)
  events.push(...weeklyToughSessions.flat(1))
  return events
})
