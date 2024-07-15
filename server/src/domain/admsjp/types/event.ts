import { Event } from '@prisma/client'

export type EventInfo = Event & {
  qtyPurchases: number
  qtyTickets: number
}
