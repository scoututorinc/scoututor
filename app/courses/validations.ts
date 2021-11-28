import { z } from 'zod'

export const CreateCourseInput = z.object({
  title: z.string(),
  description: z.string(),
  method: z.array(z.enum(['ONLINE', 'PRESENTIAL'])),
  discipline: z.string(),
  knowledgeAreas: z.array(z.string()).min(1).max(4),
  knowledgeLevel: z.array(
    z.enum([
      'BEGINNER',
      'INTERMEDIATE',
      'ADVANCED',
      'FIRSTCYCLE',
      'SECONDCYCLE',
      'THIRDCYCLE',
      'SECONDARY',
      'BACHELOR',
      'MASTER'
    ])
  ),
  previewImages: z.array(z.string()),
  hourlyRate: z.number().int().min(4).max(25)
})

export const CourseApplication = z.object({
  description: z.string().min(20),
  availableSchedule: z.string().min(20),
  courseId: z.number().int().min(0)
})

export const CourseCreation = z.object({
  name: z.string().min(5),
  description: z.string().min(20),
  hourlyRate: z.number().nonnegative()
})
