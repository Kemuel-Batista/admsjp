import { Event } from './event'

export type EventInfo = Event & {
  qtyPurchases: number
  qtyTickets: number
}
