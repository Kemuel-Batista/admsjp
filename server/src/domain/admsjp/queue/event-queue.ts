import { EventTicket, User } from '@prisma/client'

export interface EventQueueProps {
  lot?: EventTicket['lot']
  eventId?: EventTicket['eventId']
  quantity?: number
  userId?: User['id']
}

export abstract class EventQueue {
  abstract enqueue(event: EventQueueProps[]): Promise<void>
}
