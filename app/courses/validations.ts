import { z } from 'zod'

export const CreateCourseInput = z.object({
  title: z.string().min(10),
  description: z.string().min(120),
  methods: z.array(z.enum(['ONLINE', 'PRESENTIAL'])).min(1),
  discipline: z.string(),
  knowledgeAreas: z.array(z.string()).min(1).max(4),
  knowledgeLevels: z
    .array(
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
    )
    .min(1),
  previewImage: z.string(),
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
