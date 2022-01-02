import { PrismaModelsType } from '@blitz-guard/core'
import { AvailableSession, CourseMembership, WeekDay } from '@prisma/client'
import { SecurePassword } from 'blitz'
import db, { Course, Discipline, KnowledgeArea, Prisma, User } from 'db'

import faker, { random } from 'faker'
faker.locale = 'pt_PT'

const range = (n: number) => [...new Array(n).keys()]
const randomInt = (s: number, b: number) => Math.round(Math.random() * (b - s - 1)) + s

const pickOne = (...values: any) => values[Math.floor(Math.random() * values.length)]
const pickN = (values: any[], count: number) => {
  if (count <= 0) return []
  const chosen = pickOne(...values)
  return [
    chosen,
    ...pickN(
      values.filter((v: any) => v != chosen),
      count - 1
    )
  ]
}

const seed = async () => {
  await db.courseMembership.deleteMany({})
  await db.course.deleteMany({})
  await db.user.deleteMany({})
  await db.knowledgeArea.deleteMany({})
  await db.discipline.deleteMany({})

  const disciplines = await createDisciplines()
  const knowledgeAreas = await createKnowledgeAreas(disciplines)

  const users = await createUsers()
  const courses = await createCourses(users, disciplines, knowledgeAreas)
  const courseMemberships = await createCourseMemberships(users, courses)
  const availableSessions = await createAvailableSessions(users)
  await createWeeklySessions(availableSessions, courseMemberships)
  await createCourseApplications(users, courses)
  await createCourseReviews(users, courses)
}

async function createUsers() {
  const users: Prisma.UserCreateInput[] = []

  users.push({
    name: 'Jose Cardoso',
    email: 'jose@gmail.com',
    district: 'Braga',
    municipality: 'Amares',
    profilePicture: faker.image.animals(),
    hashedPassword: await SecurePassword.hash('passpass123')
  })

  for (const _ in range(10)) {
    const firstName = faker.name.firstName(1)
    const lastName = faker.name.lastName(1)
    users.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      district: 'Braga',
      municipality: 'Amares',
      profilePicture: faker.image.animals(),
      hashedPassword: await SecurePassword.hash('passpass123')
    })
  }

  await db.user.createMany({
    data: users
  })

  return await db.user.findMany({})
}

async function createDisciplines() {
  const disciplines: Prisma.DisciplineCreateManyInput[] = []

  for (const _ in range(20)) {
    disciplines.push({
      name: faker.commerce.department()
    })
  }

  await db.discipline.createMany({
    data: disciplines,
    skipDuplicates: true
  })

  return await db.discipline.findMany({})
}

async function createKnowledgeAreas(disciplines: Discipline[]) {
  const knowledgeAreas: Prisma.KnowledgeAreaCreateManyInput[] = []

  disciplines.forEach((d) => {
    for (const _ in range(20)) {
      knowledgeAreas.push({
        name: faker.commerce.productMaterial(),
        disciplineId: d.id
      })
    }
  })

  await db.knowledgeArea.createMany({
    data: knowledgeAreas,
    skipDuplicates: true
  })

  return await db.knowledgeArea.findMany({})
}

async function createCourses(
  users: User[],
  disciplines: Discipline[],
  knowledgeAreas: KnowledgeArea[]
) {
  const courses: Prisma.CourseCreateInput[] = []
  for (const _ in range(20)) {
    const authorId = users[randomInt(1, 5)]?.id || 0
    const disciplineId = disciplines[randomInt(1, disciplines.length)]?.id || 0
    const knowledgeAreaIdsForDiscipline = knowledgeAreas
      .filter((k) => k.disciplineId == disciplineId)
      .map((k) => ({ id: k.id }))

    courses.push({
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(3, '.'),
      hourlyRate: randomInt(10, 20),
      previewImage: faker.image.business(),
      status: 'ACTIVE',
      methods: pickOne(['ONLINE'], ['PRESENTIAL'], ['ONLINE', 'PRESENTIAL']),
      author: { connect: { id: authorId } },
      knowledgeLevels: pickN(
        [
          'BEGINNER',
          'INTERMEDIATE',
          'ADVANCED',
          'FIRSTCYCLE',
          'SECONDCYCLE',
          'THIRDCYCLE',
          'SECONDARY',
          'BACHELOR',
          'MASTER'
        ],
        randomInt(1, 5)
      ),
      discipline: { connect: { id: disciplineId } },
      knowledgeAreas: {
        connect: pickN(
          knowledgeAreaIdsForDiscipline,
          randomInt(1, knowledgeAreaIdsForDiscipline.length)
        )
      },
      posts: {
        create: range(3).map((_) => ({
          title: faker.company.catchPhrase(),
          description: faker.lorem.paragraphs(2, '.'),
          authorId: authorId,
          files: ['file1.pdf', 'file2.pdf'],
          comments: {
            create: range(5).map((_) => ({
              content: faker.lorem.paragraphs(1, '.'),
              authorId: users[randomInt(1, 10)]?.id || 0,
              replies: {
                create: range(2).map((_) => ({
                  content: faker.lorem.paragraphs(1, '.'),
                  authorId: users[randomInt(1, 10)]?.id || 0
                }))
              }
            }))
          }
        }))
      }
    })
  }

  await Promise.all(courses.map((c) => db.course.create({ data: c })))

  return await db.course.findMany({})
}

async function createCourseMemberships(users: User[], courses: Course[]) {
  const courseMemberships: Prisma.CourseMembershipCreateManyInput[] = []

  for (const _ in range(20)) {
    courseMemberships.push({
      weeklyHours: randomInt(4, 8),
      weeklySchedule: faker.lorem.paragraph(randomInt(1, 3)),
      userId: users[randomInt(0, 5)]?.id || 0,
      courseId: courses[randomInt(0, 14)]?.id || 0
    })
  }

  await db.courseMembership.createMany({
    data: courseMemberships,
    skipDuplicates: true
  })

  return db.courseMembership.findMany({})
}

async function createAvailableSessions(users: User[]) {
  const availableSessions: Prisma.AvailableSessionCreateManyInput[] = []

  for (const _ in range(200)) {
    availableSessions.push({
      day: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].at(randomInt(0, 4)) as WeekDay,
      startTime: new Date(),
      endTime: new Date(),
      userId: users[randomInt(0, 5)]?.id || 0
    })
  }

  await db.availableSession.createMany({
    data: availableSessions,
    skipDuplicates: true
  })

  return db.availableSession.findMany({})
}

async function createWeeklySessions(
  availableSessions: AvailableSession[],
  courseMemberships: CourseMembership[]
) {
  const weeklySessions: Prisma.WeeklySessionCreateManyInput[] = []

  for (const _ in range(100)) {
    weeklySessions.push({
      days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].at(
        randomInt(0, 4)
      ) as Prisma.Enumerable<WeekDay>,
      startTime: new Date(2021, 12, 30, 15, 0),
      endTime: new Date(2021, 12, 30, 16, 0),
      availableSessionId: availableSessions[randomInt(0, availableSessions.length)]?.id || 0,
      courseMembershipId: courseMemberships[randomInt(0, courseMemberships.length)]?.id || 0
    })
  }

  await Promise.all(weeklySessions.map((s) => db.weeklySession.create({ data: s })))

  return await db.weeklySession.findMany({})
}

async function createCourseApplications(users: User[], courses: Course[]) {
  const courseApplications: Prisma.CourseApplicationUncheckedCreateInput[] = []

  for (const _ in range(20)) {
    const courseId = courses[randomInt(15, 19)]?.id || 0
    const courseAuthorId = courses.find((c) => c.id == courseId)?.authorId
    const applicantId = users[randomInt(5, 10)]?.id || 0

    courseApplications.push({
      description: faker.lorem.paragraphs(2),
      availableSchedule: faker.lorem.paragraph(randomInt(1, 3)),
      courseId,
      applicantId,
      messages: {
        create: range(5).map((_) => ({
          content: faker.lorem.paragraphs(1),
          authorId: pickOne(applicantId, courseAuthorId)
        }))
      }
    })
  }

  await Promise.all(courseApplications.map((c) => db.courseApplication.create({ data: c })))
}

async function createCourseReviews(users: User[], courses: Course[]) {
  const courseReviews: Prisma.CourseReviewCreateInput[] = []
  for (const index in range(20)) {
    const courseId = courses[index]?.id || 0
    for (const app_index in range(10)) {
      const reviewerId = users[app_index]?.id || 0
      courseReviews.push({
        rating: randomInt(1, 5),
        content: faker.lorem.paragraph(randomInt(1, 3)),
        course: { connect: { id: courseId } },
        author: { connect: { id: reviewerId } }
      })
    }
  }
  await Promise.all(courseReviews.map((c) => db.courseReview.create({ data: c })))
}

export default seed
