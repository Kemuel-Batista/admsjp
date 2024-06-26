import { z } from 'zod'

export const cancelEventTicketsSchema = z.object({
  ids: z.array(z.string().uuid()),
})

export type CancelEventTicketsFormData = z.infer<
  typeof cancelEventTicketsSchema
>
