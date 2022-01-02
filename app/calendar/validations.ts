import { z } from 'zod'

export const TimeBlock = z.object({
  day: z.string().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable()
})
