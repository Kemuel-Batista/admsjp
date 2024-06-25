import { Event } from '@prisma/client'

export interface ListEventDTO {
  events: Event[]
  count: number
}
