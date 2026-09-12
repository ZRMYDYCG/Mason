import { z } from 'zod'

export const roleListSchema = z.object({
  role: z.string().optional().default(''),
  isSuper: z.coerce.number().optional().default(2),
  pageSize: z.coerce.number(),
  pageNo: z.coerce.number()
})

export const roleCreateSchema = z.object({
  role: z.string().min(1),
  roleName: z.string().min(1),
  isSuper: z.coerce.number(),
  remark: z.string().optional().default(''),
  menus: z.array(z.coerce.number()).optional().default([])
})

export const roleUpdateSchema = roleCreateSchema.extend({
  id: z.coerce.number()
})

export const idSchema = z.object({ id: z.coerce.number() })
export const useMenusSchema = z.object({ roleId: z.coerce.number() })

export type RoleListBody = z.infer<typeof roleListSchema>
export type RoleCreateBody = z.infer<typeof roleCreateSchema>
export type RoleUpdateBody = z.infer<typeof roleUpdateSchema>
export type IdBody = z.infer<typeof idSchema>
export type UseMenusBody = z.infer<typeof useMenusSchema>
