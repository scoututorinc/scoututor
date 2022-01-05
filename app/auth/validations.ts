import { z } from 'zod'

const password = z.string().min(10).max(100)

export const Signup = z.object({
  email: z.string().email(),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  profilePicture: z.string().url().nullable(),
  district: z.string(),
  municipality: z.string(),
  password
})

export const ChatSignUp = z.object({
  username: z.string().nonempty(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  secret: z.string().nonempty()
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
  profilePicture: z.string().url().nullable(),
  password: password.nullable(),
  currentPassword: password
})

export const UpdateProfileFormPlaceholders = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  profilePicture: z.string().nullable()
})
