import { z } from 'zod'

export const createEventPurchaseSchema = z.object({
  eventId: z.number().int().positive(),
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
