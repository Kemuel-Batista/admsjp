export declare enum OrderPaymentMethod {
    PIX = 0,
    CARD = 1,
    MANUAL = 2
}
export declare enum OrderStatus {
    PENDING = 0,
    WAITING_CONFIRMATION = 1,
    PAID = 10,
    REFUNDED = 20,
    FAILED = 90,
    CANCELED = 91,
    EXPIRED = 99
}
