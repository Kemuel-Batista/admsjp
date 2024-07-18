import { EventTicket } from '@prisma/client'

export type ListEventTicketsOnlyWithShirtsDTO = {
  eventTickets: EventTicket[]
  count: number
}
