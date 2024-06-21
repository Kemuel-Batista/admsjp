import { z } from 'zod'

export const createEventTicketSchema = z.array(
  z.object({
    eventId: z.number().int().positive(),
    lot: z.number().int().positive(),
    quantity: z.number().int().positive(),
  }),
)

export type CreateEventTicketFormData = z.infer<typeof createEventTicketSchema>
