import { resolver, SecurePassword } from 'blitz'
import { UpdateProfile } from 'app/auth/validations'
import { authenticateUser } from 'app/auth/mutations/login'
import db from 'db'

export default resolver.pipe(
  resolver.zod(UpdateProfile),
  resolver.authorize(),
  async ({ name, email, password, currentPassword }, ctx) => {
    await authenticateUser(email, currentPassword)

    const hashedPassword = await SecurePassword.hash(password.trim())

    await db.user.update({
      where: { id: ctx.session.userId! },
      data: {
        name,
        email,
        hashedPassword
      }
    })
  }
)
