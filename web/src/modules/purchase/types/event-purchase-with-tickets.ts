import { EventLot } from '../../event-lot/types/event-lot'

export type EventPurchaseWithTicketsAndLot = {
  id: string
  invoiceNumber: string
  eventId: string
  buyerId: string
  status: number
  expiresAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  deletedBy: number
  eventTickets: {
    id: string
    eventPurchaseId: string
    eventLotId: string
    ticket: string
    qrCodeImage: string
    qrCodeText: string
    cpf: string
    name: string
    email: string
    phone: string
    birthday: Date
    status: number
    shirtSize: string
    createdAt: Date
    eventLot: EventLot
  }[]
}
