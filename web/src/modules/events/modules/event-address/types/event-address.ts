export type EventAddress = {
  id: number
  uuid: string
  eventId: number
  street: string
  number: string
  complement: string
  neighborhood: string
  state: number
  city: number
  latitude: number
  longitude: number
  createdAt: Date
  createdBy: number
  updatedAt: Date | null
  updatedBy: number | null
  deletedAt: Date | null
  deletedBy: number | null
}
