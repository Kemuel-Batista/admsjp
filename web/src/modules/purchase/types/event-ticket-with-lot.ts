import { EventLot } from '../../event-lot/types/event-lot'

export type EventTicketWithLot = {
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
  shirtSize: string
  createdAt: Date
  eventLot: EventLot
}
