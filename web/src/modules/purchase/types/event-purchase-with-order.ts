import { Order } from '@/modules/orders/types/order'

export type EventPurchaseWithOrder = {
  id: string
  invoiceNumber: string
  eventId: string
  buyerId: string
  buyerEmail: string
  buyerName: string
  status: number
  expiresAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  deletedBy: number
  order: Order | null
}
