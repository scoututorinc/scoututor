import { resolver } from 'blitz'
import { ProfileUpdate } from 'app/users/validations'

export default resolver.pipe(
  resolver.zod(ProfileUpdate),
  async ({ name, email, password }, ctx) => {}
)
