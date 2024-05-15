export enum OrderPaymentMethod {
  PIX = 0,
  CARD = 1,
}

export enum OrderStatus {
  PENDING = 0,
  PAID = 10,
  REFUNDED = 20,
  FAILED = 90,
  CANCELED = 91,
  EXPIRED = 99,
}
