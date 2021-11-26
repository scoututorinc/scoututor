import { z } from 'zod'

export const CourseApplication = z.object({
  interest_manifestation_and_questions: z.string().min(20),
  availability: z.string().min(20)
})
