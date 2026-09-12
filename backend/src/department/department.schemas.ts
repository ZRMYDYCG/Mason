import { z } from 'zod'

export const deptCreateSchema = z.object({
  name: z.string().min(1),
  parentId: z.coerce.number(),
  sort: z.coerce.number().optional().default(1),
  isEnable: z.coerce.number().optional().default(0)
})

export const deptUpdateSchema = deptCreateSchema.extend({ id: z.coerce.number() })
export const idSchema = z.object({ id: z.coerce.number() })

export type DeptCreateBody = z.infer<typeof deptCreateSchema>
export type DeptUpdateBody = z.infer<typeof deptUpdateSchema>
export type IdBody = z.infer<typeof idSchema>
