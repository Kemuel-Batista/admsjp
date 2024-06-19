export type EventLot = {
  name: string
  description: string
  eventId: number
  lot: number
  quantity: number
  fulfilledQuantity: number
  value: number
  status: number
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  updatedBy: number | null
  deletedAt: Date | null
  deletedBy: number | null
}
