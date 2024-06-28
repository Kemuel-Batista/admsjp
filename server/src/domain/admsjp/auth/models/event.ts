import { z } from 'zod'

export const eventSchema = z.object({
  __typename: z.literal('Event').default('Event'),
  id: z.string(),
  departmentId: z.string(),
})

export type Event = z.infer<typeof eventSchema>
