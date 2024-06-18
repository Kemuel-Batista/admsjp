import { z } from 'zod'

const editEventLotSchema = z
  .object({
    quantity: z.number().int().positive(),
    lot: z.number().int().positive(),
    value: z.number().int().positive(),
    status: z.number().min(0).max(1),
  })
  .array()

const editEventSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  initialDate: z.string().transform((arg) => new Date(arg)),
  finalDate: z.string().transform((arg) => new Date(arg)),
  status: z.coerce.number().int().min(0).max(1).optional(),
  visible: z.coerce.number().int().min(0).max(1).optional(),
  eventType: z.coerce.number().min(0).max(20),
  departmentId: z.coerce.number().positive().min(1),
  message: z.string().optional(),
  lots: z
    .string()
    .refine(
      (str) => {
        try {
          const parsedArray = JSON.parse(str)
          editEventLotSchema.parse(parsedArray)
          return Array.isArray(parsedArray)
        } catch (error) {
          return false
        }
      },
      { message: 'Invalid lots array format' },
    )
    .transform((str) => JSON.parse(str)),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  state: z.coerce.number().positive().min(1).optional(),
  city: z.coerce.number().positive().min(1).optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export type EditEventFormData = z.infer<typeof editEventSchema>
