import { EventPurchaseStatus } from '../enums/event-purchase-status'

export const EventPurchaseStatusDescription: Record<
  EventPurchaseStatus,
  string
> = {
  [EventPurchaseStatus.NEW]: 'Novo',
  [EventPurchaseStatus.WAITING_CONFIRMATION]: 'Aguardando confirmação',
  [EventPurchaseStatus.CONFIRMED]: 'Confirmado',
  [EventPurchaseStatus.CANCELED]: 'Cancelado',
  [EventPurchaseStatus.REFUNDED]: 'Reembolsado',
}
