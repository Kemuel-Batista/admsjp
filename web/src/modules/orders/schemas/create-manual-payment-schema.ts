import { z } from 'zod'

export const createManualPaymentSchema = z.object({
  transactionId: z.string().uuid(),
  image: z
    .instanceof(FileList)
    .transform((list) => list.item(0))
    .refine(
      (file) => file!.size <= 5 * 1024 * 1024,
      'O arquivo precisa ter no mínimo 5MB',
    ),
})

export type CreateManualPaymentFormData = z.infer<
  typeof createManualPaymentSchema
>
