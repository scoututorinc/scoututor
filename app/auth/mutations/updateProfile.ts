import { resolver, SecurePassword, NotFoundError } from 'blitz'
import { UpdateProfile } from 'app/auth/validations'
import { authenticateUser } from 'app/auth/mutations/login'
import db from 'db'

export default resolver.pipe(
  resolver.zod(UpdateProfile),
  resolver.authorize(),
  async ({ name, email, password, currentPassword, profilePicture }, ctx) => {
    const user = await db.user.findFirst({
      where: { id: ctx.session.userId! }
    })

    if (!user) throw new NotFoundError()

    await authenticateUser(user.email, currentPassword)

    let update_object = {
      name,
      email,
      profilePicture,
      password: password ? await SecurePassword.hash(password?.trim()) : null
    }

    const clean_update_object = Object.fromEntries(
      Object.entries(update_object).filter(([_, v]) => v != null)
    )

    await db.user.update({
      where: { id: ctx.session.userId! },
      data: clean_update_object
    })
  }
)
