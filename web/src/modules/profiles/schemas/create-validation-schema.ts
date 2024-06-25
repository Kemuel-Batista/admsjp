import { z } from 'zod'

const createProfileSchema = z.object({
  name: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

export type CreateProfileFormData = z.infer<typeof createProfileSchema>
