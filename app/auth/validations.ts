import { z } from 'zod'

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(),
  name: z.string().min(5),
  profilePicture: z.string().url().optional(),
  password
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string()
})

export const ForgotPassword = z.object({
  email: z.string().email()
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation']
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password
})

export const UpdateProfile = z.object({
  name: z.string().min(5).nullable(),
  email: z.string().email().nullable(),
  password: password.nullable(),
  currentPassword: password
})
