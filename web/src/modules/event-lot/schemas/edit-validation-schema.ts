import { z } from 'zod'

export const editEventLotSchema = z.object({
  eventId: z.number().int().positive(),
  lot: z.number().int().positive(),
  quantity: z.number().int().positive(),
  value: z.number().int().positive(),
  status: z.number().int().positive(),
})

export type EditEventLotFormData = z.infer<typeof editEventLotSchema>
