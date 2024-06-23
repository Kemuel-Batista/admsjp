import { EventLot, EventPurchase } from '@prisma/client'

export interface EventQueueProps {
  eventId?: EventPurchase['eventId']
  buyerId?: EventPurchase['buyerId']
  eventLotInfo: {
    eventLotId?: EventLot['id']
    quantity?: number
  }[]
}

export abstract class EventQueue {
  abstract enqueue(event: EventQueueProps): Promise<void>
}
