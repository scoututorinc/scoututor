import { z } from 'zod'

export const ChatSignUp = z.object({
  username: z.string().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  secret: z.string().nonempty()
})
