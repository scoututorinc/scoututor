import { SecurePassword } from 'blitz'
import db, { Prisma, User } from 'db'
import faker from 'faker'
faker.locale = 'pt_PT'

const range = (n: number) => [...new Array(n).keys()]
const randomInt = (s: number, b: number) => Math.round(Math.random() * (b - s)) + b

const seed = async () => {
  await db.course.deleteMany({})
  await db.user.deleteMany({})

  const users = await createUsers()
  console.log(
    `users`,
    users.map((x) => x.id)
  )
  await createCourses(users)
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

async function createCourses(users: User[]) {
  const courses: Prisma.CourseCreateManyInput[] = []

  for (const _ in range(20)) {
    courses.push({
      name: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(3, '.'),
      icon: faker.image.technics(),
      hourlyRate: randomInt(10, 20),
      previewImages: range(randomInt(1, 4)).map((_) => faker.image.business()),
      authorId: users[randomInt(1, 5)]?.id || 2
    })
  }

  await db.course.createMany({
    data: courses,
    skipDuplicates: true
  })
}

export default seed
