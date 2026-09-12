import { z } from 'zod'

export const logListSchema = z.object({
  pageNo: z.coerce.number(),
  pageSize: z.coerce.number(),
  username: z.string().optional().default(''),
  method: z.string().optional().default(''),
  path: z.string().optional().default(''),
  status: z.coerce.number().optional(),
  startTime: z.string().optional().default(''),
  endTime: z.string().optional().default('')
})

export const idSchema = z.object({ id: z.coerce.number() })
