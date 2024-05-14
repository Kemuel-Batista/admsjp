import { EventTicket } from '@prisma/client'

export interface EventQueueProps {
  lot: EventTicket['lot']
  eventId: EventTicket['eventId']
  userId: EventTicket['id']
}

export abstract class EventQueue {
  abstract enqueue(event: EventQueueProps): Promise<void>
}
