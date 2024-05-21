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

export type EventTicketWithEventAndEventLot = Prisma.EventTicketGetPayload<{
  include: {
    eventLot: {
      select: {
        lot: true
      }
    }
    event: {
      select: {
        id: true
        title: true
        description: true
        department: {
          select: {
            name: true
          }
        }
        imagePath: true
        eventType: true
      }
    }
  }
}>
