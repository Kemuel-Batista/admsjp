import { z } from 'zod'

export const editEventAddressSchema = z.object({
  id: z.number().int().positive(),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  state: z.coerce.number().positive().min(1).optional(),
  city: z.coerce.number().positive().min(1).optional(),
  latitude: z.coerce
    .number()
    .refine((value) => {
      return Math.abs(value) <= 90
    })
    .optional(),
  longitude: z.coerce
    .number()
    .refine((value) => {
      return Math.abs(value) <= 180
    })
    .optional(),
})

export type EditEventAddressFormData = z.infer<typeof editEventAddressSchema>
