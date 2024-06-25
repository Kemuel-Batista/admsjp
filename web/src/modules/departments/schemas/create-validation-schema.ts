import { z } from 'zod'

export const createDepartmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

export type CreateDepartmentFormData = z.infer<typeof createDepartmentSchema>
