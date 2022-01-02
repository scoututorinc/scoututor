import { z } from 'zod'

export const TimeBlock = z.object({
  day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']),
  startTime: z.string(),
  endTime: z.string()
})
