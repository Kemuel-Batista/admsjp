import { z } from 'zod'

export const listProfileSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  allRecords: z.boolean().optional().nullable(),
})
