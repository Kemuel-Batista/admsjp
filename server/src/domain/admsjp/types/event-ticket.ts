import { Order, Prisma } from '@prisma/client'

export type EventTicketWithEventLot = Prisma.EventTicketGetPayload<{
  include: {
    eventLot: {
      select: {
        lot: true
        value: true
      }
    }
  }
}>

export type EventTicketWithAllInformation = EventTicketWithEventLot & {
  orders: Order[]
}
