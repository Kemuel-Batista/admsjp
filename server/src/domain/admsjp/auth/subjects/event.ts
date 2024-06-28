import { z } from 'zod'

export const eventSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Event'),
])

export type EventSubject = z.infer<typeof eventSubject>
