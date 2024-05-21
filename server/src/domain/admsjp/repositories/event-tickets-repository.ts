import { EventTicket, Prisma } from '@prisma/client'

import {
  EventTicketWithEventAndEventLot,
  EventTicketWithUserAndEventLot,
} from '../types/event-ticket'

export abstract class EventTicketsRepository {
  abstract create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket>

  abstract update(data: EventTicket): Promise<EventTicket>

  abstract findByEventIdAndUserId(
    eventId: EventTicket['eventId'],
    userId: EventTicket['userId'],
  ): Promise<EventTicket | null>

  abstract findById(id: EventTicket['id']): Promise<EventTicket | null>

  abstract listByLot(lot: EventTicket['lot']): Promise<EventTicket[]>
  abstract listDetailsByUserId(
    userId: EventTicket['userId'],
  ): Promise<EventTicketWithEventAndEventLot[]>

  abstract listDetailsByEventId(
    eventId: EventTicket['eventId'],
  ): Promise<EventTicketWithUserAndEventLot[]>

  abstract lastTicket(): Promise<string>
}
