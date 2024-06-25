export type EventTicketWithEventLot = {
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
  createdAt: Date
  eventLot: {
    name: string
    lot: number
    value: number
  }
}
