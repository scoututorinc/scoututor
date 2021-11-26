import { z } from 'zod'

export const CreateCourseInput = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  previewImages: z.array(z.string()),
  hourlyRate: z.number().int().min(4).max(25)
})

export const CourseApplication = z.object({
  description: z.string().min(20),
  availableSchedule: z.string().min(20),
  courseId: z.number().int().min(0)
})
