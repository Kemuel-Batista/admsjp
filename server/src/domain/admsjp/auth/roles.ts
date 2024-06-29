import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('ADMIN'),
  z.literal('MANAGER_EVENTS'),
])

export type Role = z.infer<typeof roleSchema>
