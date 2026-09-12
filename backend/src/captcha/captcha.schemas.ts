import { z } from 'zod'

export const verifyCaptchaSchema = z.object({
  id: z.string().min(1),
  answer: z.union([z.string(), z.number(), z.array(z.object({ x: z.number(), y: z.number() }))])
})

export type VerifyCaptchaBody = z.infer<typeof verifyCaptchaSchema>
