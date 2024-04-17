import { z } from 'zod'

export const findUserByIdSchema = z.object({
  userId: z.number().int().positive(),
})

export const updateSelfPassword = z.object({
  newPassword: z.string().min(6).max(20),
})
