import { resolver, SecurePassword, NotFoundError } from 'blitz'
import { UpdateProfile } from 'app/auth/validations'
import { authenticateUser } from 'app/auth/mutations/login'
import db from 'db'

export default resolver.pipe(
  resolver.zod(UpdateProfile),
  resolver.authorize(),
  async ({ name, email, password, currentPassword }, ctx) => {
    const user = await db.user.findFirst({
      where: { id: ctx.session.userId! }
    })

    if (!user) throw new NotFoundError()

    await authenticateUser(user.email, currentPassword)

    const hashedPassword = await SecurePassword.hash(password?.trim())

    let update_object = {
      name: name,
      email: email,
      password: hashedPassword
    }

    console.log(update_object)

    const clean_update_object = Object.fromEntries(
      Object.entries(update_object).filter(([_, v]) => v != null)
    )

    console.log(clean_update_object)

    await db.user.update({
      where: { id: ctx.session.userId! },
      data: { ...clean_update_object }
    })
  }
)
