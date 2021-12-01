import { SecurePassword } from 'blitz'
import db, { Course, Discipline, Prisma, User } from 'db'

import faker from 'faker'
faker.locale = 'pt_PT'

const range = (n: number) => [...new Array(n).keys()]
const randomInt = (s: number, b: number) => Math.round(Math.random() * (b - s - 1)) + s
const pickOne = (...values: any) => values[Math.floor(Math.random() * values.length)]

const seed = async () => {
  await db.courseMembership.deleteMany({})
  await db.course.deleteMany({})
  await db.user.deleteMany({})
  await db.knowledgeArea.deleteMany({})
  await db.discipline.deleteMany({})

  const disciplines = await createDisciplines()
  const knowledgeAreas = await createKnowledgeAreas(disciplines)
  const users = await createUsers()
  const courses = await createCourses(users, disciplines)
  await createCourseMemberships(users, courses)
  await createCourseApplications(users, courses)
}

async function createUsers() {
  const users: Prisma.UserCreateInput[] = []

  users.push({
    name: 'Jose Cardoso',
    email: 'jose@gmail.com',
    profilePicture: faker.image.animals(),
    hashedPassword: await SecurePassword.hash('passpass123')
  })

  for (const _ in range(10)) {
    const firstName = faker.name.firstName(1)
    const lastName = faker.name.lastName(1)
    users.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
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

async function createCourses(users: User[], disciplines: Discipline[]) {
  const courses: Prisma.CourseCreateInput[] = []

  for (const _ in range(20)) {
    courses.push({
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(3, '.'),
      hourlyRate: randomInt(10, 20),
      previewImage: faker.image.business(),
      status: 'ACTIVE',
      methods: pickOne(['ONLINE'], ['PRESENTIAL'], ['ONLINE', 'PRESENTIAL']),
      author: { connect: { id: users[randomInt(1, 5)]?.id || 0 } },
      discipline: { connect: { id: disciplines[randomInt(1, disciplines.length)]?.id || 0 } }
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
}

async function createCourseApplications(users: User[], courses: Course[]) {
  const courseApplications: Prisma.CourseApplicationCreateManyInput[] = []

  for (const _ in range(20)) {
    courseApplications.push({
      description: faker.lorem.paragraphs(2),
      availableSchedule: faker.lorem.paragraph(randomInt(1, 3)),
      courseId: courses[randomInt(15, 19)]?.id || 0,
      applicantId: users[randomInt(5, 10)]?.id || 0
    })
  }

  await db.courseApplication.createMany({
    data: courseApplications,
    skipDuplicates: true
  })
}

export default seed
