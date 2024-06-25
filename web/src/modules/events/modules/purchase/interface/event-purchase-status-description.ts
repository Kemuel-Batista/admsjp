import { EventPurchaseStatus } from '../enums/event-purchase-status'

interface EventPurchaseStatusDescription {
  [EventPurchaseStatus.NEW]: 'Novo'
  [EventPurchaseStatus.WAITING_CONFIRMATION]: 'Aguardando confirmação'
  [EventPurchaseStatus.CONFIRMED]: 'Confirmado'
  [EventPurchaseStatus.CANCELED]: 'Cancelado'
  [EventPurchaseStatus.REFUNDED]: 'Reembolsado'
}

export type { EventPurchaseStatusDescription }
