import { z } from 'zod'

export const menuListSchema = z.object({
  title: z.string().optional().default(''),
  isEnable: z.coerce.number().optional().default(2)
})

export const menuCreateSchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  parentId: z.coerce.number(),
  sort: z.coerce.number().optional().default(1),
  icon: z.string().optional().default(''),
  title: z.string().min(1),
  isLink: z.coerce.number().optional().default(0),
  isEnable: z.coerce.number().optional().default(0),
  isAffix: z.coerce.number().optional().default(0),
  isKeepAlive: z.coerce.number().optional().default(0)
})

export const menuUpdateSchema = menuCreateSchema.extend({ id: z.coerce.number() })
export const idSchema = z.object({ id: z.coerce.number() })
