import { z } from 'zod'

export const completeEventTicketInfoSchema = z.object({
  data: z.array(
    z.object({
      id: z.string().uuid(),
      eventPurchaseId: z.string().uuid(),
      name: z.string({ required_error: 'Nome não pode estar vazio' }),
      email: z
        .string({ required_error: 'E-mail não pode estar vazio' })
        .email({ message: 'O formato do e-mail não é válido!' }),
      cpf: z
        .string({ required_error: 'CPF não pode estar vazio' })
        .min(11, { message: 'CPF deve conter 11 caracteres' })
        .max(11, { message: 'CPF deve conter 11 caracteres' }),
      phone: z
        .string({ required_error: 'Telefone não pode estar vazio' })
        .min(11, { message: 'Telefone deve conter 11 caracteres' })
        .max(11, { message: 'Telefone deve conter 11 caracteres' }),
      birthday: z.date({
        required_error: 'Data de nascimento não deve estar vazia',
      }),
      shirtSize: z.string().min(1).max(3).optional(),
      eventLotType: z.string(),
    }),
  ),
})

export type CompleteEventTicketInfoFormData = z.infer<
  typeof completeEventTicketInfoSchema
>
