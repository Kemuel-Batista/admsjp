import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('ADMIN'),
  z.literal('EVENTS_MANAGER'),
])

export type Role = z.infer<typeof roleSchema>
