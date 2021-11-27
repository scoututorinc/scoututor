import { z } from 'zod'

export const ProfileUpdate = z.object({
  name: z.string() || z.null(),
  email: z.string().email() || z.null(),
  password: z.string() || z.null()
})
