import { z } from 'zod'

export const createEventPurchaseSchema = z.object({
  eventId: z.string().optional(),
  eventLotInfo: z.array(
    z.object({
      eventLotId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
})

export type CreateEventPurchaseFormData = z.infer<
  typeof createEventPurchaseSchema
>
