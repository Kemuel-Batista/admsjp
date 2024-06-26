export type EventPurchaseInfo = {
  eventPurchaseId: string
  title: string
  slug: string
  pixKey: string
  pixType: number
  eventId: number
  expiresAt: string
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
    shirtSize: string
    createdAt: Date
  }[]
}
