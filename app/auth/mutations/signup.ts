import axios from 'axios'
import { resolver, SecurePassword } from 'blitz'
import db from 'db'
import { Signup, ChatSignUp } from 'app/auth/validations'
import { Role } from 'types'
import { z } from 'zod'

const chat_private_key = process.env.CHAT_ENGINE_PRIVATE_KEY
axios.defaults.headers.common['PRIVATE-KEY'] = chat_private_key!

const createChatUser = async ({
  username,
  first_name,
  last_name,
  secret
}: z.infer<typeof ChatSignUp>) => {
  try {
    const response = await axios.post('https://api.chatengine.io/users/', {
      username: username,
      first_name: first_name,
      last_name: last_name,
      secret: secret
    })
    if (response.status != 201) {
      throw { statusCode: response.status, data: response.data }
    }
  } catch (error) {
    // TODO: there must be a better error handling mechanism
    console.log('Error creating chat user:', error)
  }
}

export default resolver.pipe(
  resolver.zod(Signup),
  async (
    { email, first_name, last_name, district, municipality, profilePicture, password },
    ctx
  ) => {
    console.log('Request Context 1:', ctx)
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        district,
        municipality,
        name: first_name.trim() + ' ' + last_name.trim(),
        profilePicture: profilePicture?.trim(),
        hashedPassword,
        role: 'USER'
      },
      select: { id: true, name: true, email: true, profilePicture: true, role: true }
    })
    const chatEngineData = {
      username: first_name.trim() + ' ' + last_name.trim(),
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      secret: email.trim()
    }
    console.log('Request Context 2:', ctx)

    await createChatUser(chatEngineData)

    console.log('Request Context 3:', ctx)
    await ctx.session.$create({ userId: user.id, role: user.role as Role })

    return user
  }
)
