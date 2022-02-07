import { PrismaModelsType } from '@blitz-guard/core'
import { AvailableSession, CourseMembership, WeekDay } from '@prisma/client'
import { SecurePassword } from 'blitz'
import db, { Course, Discipline, KnowledgeArea, Prisma, User } from 'db'

import { portugal } from 'app/auth/data/portugal'

import faker, { random } from 'faker'
faker.locale = 'pt_PT'

const range = (n: number) => [...new Array(n).keys()]
const randomInt = (s: number, b: number) => Math.round(Math.random() * (b - s - 1)) + s

const pickOne = <T>(...values: T[]) => values[Math.floor(Math.random() * values.length)]
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
  await db.availableSession.deleteMany({})
  await db.courseMembership.deleteMany({})
  await db.course.deleteMany({})
  await db.user.deleteMany({})
  await db.knowledgeArea.deleteMany({})
  await db.discipline.deleteMany({})
  await db.notification.deleteMany({})

  const disciplines = await createDisciplines()
  const knowledgeAreas = await createKnowledgeAreas(disciplines)

  const users = await createUsers()
  const courses = await createCourses(users, disciplines, knowledgeAreas)
  const courseMemberships = await createCourseMemberships(users, courses)
  const availableSessions = await createAvailableSessions(users, courses, courseMemberships)
  await createCourseApplications(users, courses)
  await createCourseReviews(users, courses)
}

async function createUsers() {
  const users: Prisma.UserCreateInput[] = []

  users.push({
    name: 'Joao Cardoso',
    email: 'joao@gmail.com',
    district: 'Braga',
    municipality: 'Amares',
    profilePicture: faker.image.animals(),
    hashedPassword: await SecurePassword.hash('passpass123')
  })

  for (const _ in range(10)) {
    const firstName = faker.name.firstName(1)
    const lastName = faker.name.lastName(1)
    const randDistrict = pickOne(...portugal)?.name
    const randConselho = pickOne(
      ...(portugal.find((d) => d.name == randDistrict)?.conselhos || [])
    )?.name

    users.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      district: randDistrict || 'Braga',
      municipality: randConselho || 'Amares',
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

  // for (const _ in range(20)) {
  //   disciplines.push({
  //     name: faker.commerce.department()
  //   })
  // }

  disciplines.push({
    id: 1,
    name: 'English'
  })
  disciplines.push({
    id: 2,
    name: 'Math'
  })

  await db.discipline.createMany({
    data: disciplines,
    skipDuplicates: true
  })

  return await db.discipline.findMany({})
}

async function createKnowledgeAreas(disciplines: Discipline[]) {
  const knowledgeAreas: Prisma.KnowledgeAreaCreateManyInput[] = []

  // disciplines.forEach((d) => {
  //   for (const _ in range(20)) {
  //     knowledgeAreas.push({
  //       name: faker.commerce.productMaterial(),
  //       disciplineId: d.id
  //     })
  //   }
  // })

  knowledgeAreas.push({
    name: 'Grammar',
    disciplineId: 1
  })
  knowledgeAreas.push({
    name: 'Verbal Skills',
    disciplineId: 1
  })
  knowledgeAreas.push({
    name: 'Trigonometry',
    disciplineId: 2
  })
  knowledgeAreas.push({
    name: 'Fractions',
    disciplineId: 2
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
    const disciplineId = pickOne(disciplines[0]?.id, disciplines[1]?.id)
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
          files: {
            createMany: {
              data: [
                { name: 'file1.png', url: faker.image.business() },
                { name: 'file2.png', url: faker.image.business() }
              ]
            }
          },
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
  const notifications: Prisma.NotificationCreateManyInput[] = []

  for (const _ in range(20)) {
    const randomCourse = courses[randomInt(0, 14)]
    const randomUser = users[randomInt(0, 5)]

    courseMemberships.push({
      weeklyHours: randomInt(4, 8),
      userId: randomUser?.id || 0,
      courseId: randomCourse?.id || 0
    })
    notifications.push({
      type: 'APPLICATION_ACCEPT',
      courseId: randomCourse?.id || 0,
      entityId: -1,
      ownerId: randomUser?.id || 0,
      creatorId: randomCourse?.authorId || 0
    })
  }

  await db.courseMembership.createMany({
    data: courseMemberships,
    skipDuplicates: true
  })

  await db.notification.createMany({
    data: notifications,
    skipDuplicates: true
  })

  return db.courseMembership.findMany({})
}

async function createAvailableSessions(
  users: User[],
  courses: Course[],
  courseMemberships: CourseMembership[]
) {
  const availableSessions: Prisma.AvailableSessionCreateManyInput[] = []

  for (const courseMembership of courseMemberships) {
    const course = courses.find((c) => c.id == courseMembership.courseId)!
    availableSessions.push({
      day: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].at(randomInt(0, 4)) as WeekDay,
      startTime: new Date(2021, 12, 12, 21, 0),
      endTime: new Date(2021, 12, 12, 22, 0),
      userId: course.authorId,
      courseMembershipId: courseMembership.id
    })
  }

  for (const user of users) {
    availableSessions.push({
      day: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].at(randomInt(0, 4)) as WeekDay,
      startTime: new Date(2021, 12, 12, 21, 0),
      endTime: new Date(2021, 12, 12, 22, 0),
      userId: user.id,
      courseMembershipId: null
    })
  }

  await db.availableSession.createMany({
    data: availableSessions,
    skipDuplicates: true
  })

  return db.availableSession.findMany({})
}

async function createCourseApplications(users: User[], courses: Course[]) {
  const courseApplications: Prisma.CourseApplicationUncheckedCreateInput[] = []
  const notifications: Prisma.NotificationCreateManyInput[] = []

  for (const _ in range(20)) {
    const randomCourse = courses[randomInt(15, 19)]
    const applicantId = users[randomInt(5, 10)]?.id || 0

    courseApplications.push({
      description: faker.lorem.paragraphs(2),
      //TODO: Add available sessions
      // availableSchedule: faker.lorem.paragraph(randomInt(1, 3)),
      courseId: randomCourse?.id || 0,
      applicantId,
      messages: {
        create: range(5).map((_) => ({
          content: faker.lorem.paragraphs(1),
          authorId: pickOne(applicantId, randomCourse?.authorId) || 0
        }))
      }
    })

    notifications.push({
      type: 'APPLICATION_CREATE',
      courseId: randomCourse?.id || 0,
      entityId: -1,
      ownerId: randomCourse?.authorId || 0,
      creatorId: applicantId
    })
  }

  await Promise.all(courseApplications.map((c) => db.courseApplication.create({ data: c })))

  await db.notification.createMany({
    data: notifications,
    skipDuplicates: true
  })
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
