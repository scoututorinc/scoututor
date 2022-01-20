import { number, z } from 'zod'

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

export const UpdateCourseInput = CreateCourseInput.partial().extend({
  id: z.number()
})

export const CourseApplication = z.object({
  description: z.string().min(20),
  availableSessions: z.array(z.number().min(0)).min(1),
  courseId: z.number().int().min(0)
})

export const CourseAcceptance = z.object({
  applicationId: z.number().int().min(0),
  applicantId: z.number().int().min(0),
  courseId: z.number().int().min(0)
})

export const CourseCreation = z.object({
  name: z.string().min(5),
  description: z.string().min(20),
  hourlyRate: z.number().nonnegative()
})

export const CoursePost = z.object({
  courseId: z.number(),
  title: z.string().min(5),
  description: z.string().min(20),
  files: z.array(
    z.object({
      name: z.string().min(1),
      url: z.string().url()
    })
  )
})

export const CreatePostCommentInput = z.object({
  postId: z.number(),
  content: z.string().min(1)
})

export const CreatePostCommentReplyInput = z.object({
  commentId: z.number(),
  content: z.string().min(1)
})

export const CreateCourseApplicationMessage = z.object({
  applicationId: z.number(),
  content: z.string().min(1)
})

export const CreateCourseReview = z.object({
  classification: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  courseId: z.number().int().min(0)
})

export const CancelMembershipInput = z.object({
  userId: z.number().int().min(0),
  courseId: z.number().int().min(0)
})
