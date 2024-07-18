export type EventTicket = {
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
  status: number
  updatedAt?: string
  updatedBy?: string
  delieveredAt?: string
  deliveredBy?: string
}
