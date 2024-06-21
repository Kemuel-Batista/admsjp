import { z } from 'zod'

export const completeEventTicketInfoSchema = z.object({
  tickets: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      cpf: z.string().min(11).max(11),
      phone: z.string().max(11),
      birthday: z.date(),
    }),
  ),
})

export type CompleteEventTicketInfoFormData = z.infer<
  typeof completeEventTicketInfoSchema
>
