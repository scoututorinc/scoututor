import { SecurePassword } from 'blitz'
import db, { Prisma } from 'db'
// import { Prisma } from '@prisma/client'
import faker from 'faker'
faker.locale = 'pt_PT'

const range = (n: number) => [...new Array(n).keys()]

const seed = async () => {
  await db.user.deleteMany({})
  const users: Prisma.UserCreateInput[] = []

  users.push({
    name: 'Jose Cardoso',
    email: 'jose@gmail.com',
    profilePicture: faker.image.animals(),
    hashedPassword: await SecurePassword.hash('passpass123')
  })

  for (const _ in range(5)) {
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
}

export default seed
