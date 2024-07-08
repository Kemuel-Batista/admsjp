export type Order = {
  id: string
  transactionId: string
  // transactionType:
  paymentMethod: number
  status: number
  pixQrCode?: string
  paidAt?: string
  attachment?: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  deletedBy?: string
  confirmedBy?: string
}
