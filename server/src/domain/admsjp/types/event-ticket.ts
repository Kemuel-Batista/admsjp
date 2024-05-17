import { Prisma } from '@prisma/client'

export type EventTicketWithUserAndEventLot = Prisma.EventTicketGetPayload<{
  include: {
    user: {
      select: {
        id: true
        name: true
        email: true
      }
    }
    eventLot: {
      select: {
        lot: true
      }
    }
  }
}>
