import { EventPurchaseWithBuyer } from '../../types/event-purchase'

export type ListEventPurchasesByEventIdDTO = {
  eventPurchases: EventPurchaseWithBuyer[]
  count: number
}
