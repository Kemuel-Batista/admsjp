export type EventPurchaseWithEvent = {
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
  event: {
    title: string
    slug: string
    initialDate: string
    finalDate: string
    imagePath: string
  }
}
