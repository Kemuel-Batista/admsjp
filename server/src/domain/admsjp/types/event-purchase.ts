import { Prisma } from '@prisma/client'

export type EventPurchaseWithEvent = Prisma.EventPurchaseGetPayload<{
  include: {
    event: {
      select: {
        title: true
        slug: true
        initialDate: true
        finalDate: true
        imagePath: true
      }
    }
  }
}>

export type EventPurchaseWithEventTickets = Prisma.EventPurchaseGetPayload<{
  include: {
    eventTickets: true
  }
}>
