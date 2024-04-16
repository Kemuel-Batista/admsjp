import { z } from 'zod'

export const listProfileSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  allRecords: z.boolean().optional().nullable(),
})

export const createProfileSchema = z.object({
  name: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})
