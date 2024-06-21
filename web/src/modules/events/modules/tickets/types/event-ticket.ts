export type EventTicket = {
  id: string
  eventId: number
  lot: number
  cpf: string
  name: string
  email: string
  phone: string
  birthday: Date
  ticket: string
  expiresAt: Date
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  deletedAt: Date | null
  deletedBy: number | null
}
