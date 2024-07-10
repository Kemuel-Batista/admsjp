import { Order, Prisma } from '@prisma/client'

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

export type EventPurchaseWithBuyer = Prisma.EventPurchaseGetPayload<{
  include: {
    user: {
      select: {
        email: true
        name: true
      }
    }
  }
}>

export type EventPurchaseWithEventTicketsAndLot =
  Prisma.EventPurchaseGetPayload<{
    include: {
      eventTickets: {
        select: {
          id: true
          eventLotId: true
          eventPurchaseId: true
          ticket: true
          email: true
          name: true
          cpf: true
          phone: true
          qrCodeImage: true
          qrCodeText: true
          shirtSize: true
          birthday: true
          createdAt: true
        }
        include: {
          eventLot: true
        }
      }
    }
  }>

export type EventPurchaseWithOrder = {
  id: string
  invoiceNumber: string
  eventId: string
  buyerId: string
  buyerName: string
  buyerEmail: string
  status: number
  expiresAt?: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedBy?: string
  order: Order | null
}
