import { z } from 'zod'

export const CourseApplication = z.object({
  interest_manifestation_and_questions: z.string().min(20),
  availability: z.string().min(20)
})

export const CourseCreation = z.object({
  name: z.string().min(5),
  description: z.string().min(20),
  hourlyRate: z.number().nonnegative()
})
