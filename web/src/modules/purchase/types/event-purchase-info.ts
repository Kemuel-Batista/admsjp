import { EventTicket } from '@/modules/tickets/types/event-ticket'

export type EventPurchaseInfo = {
  eventPurchaseId: string
  title: string
  slug: string
  pixKey: string
  pixType: number
  eventId: string
  expiresAt: string
  eventTickets: EventTicket[]
}
