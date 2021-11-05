// import db from "./index"

import { SecurePassword } from 'blitz'
import db from 'db'

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.user.create({
    data: {
      name: 'Jose',
      email: 'jose@gmail.com',
      hashedPassword: await SecurePassword.hash('pass1234567')
    }
  })

  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
}

export default seed
