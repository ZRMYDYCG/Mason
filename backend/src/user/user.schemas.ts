import { z } from 'zod'

export const userListSchema = z.object({
  username: z.string().optional().default(''),
  pageSize: z.coerce.number(),
  pageNo: z.coerce.number(),
  deptId: z.coerce.number().optional().default(1)
})

export const userCreateSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  roleId: z.coerce.number(),
  deptId: z.coerce.number().optional().default(1),
  name: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  remark: z.string().optional().default('')
})

export const userUpdateSchema = z.object({
  id: z.coerce.number(),
  username: z.string().min(1),
  roleId: z.coerce.number(),
  deptId: z.coerce.number().optional().default(1),
  name: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  remark: z.string().optional().default('')
})

export const idSchema = z.object({ id: z.coerce.number() })
