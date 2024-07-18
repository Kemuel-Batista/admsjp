import { z } from 'zod'

export const changeEventTicketStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.coerce.number().int(),
})

export type ChangeEventTicketStatusFormData = z.infer<
  typeof changeEventTicketStatusSchema
>
