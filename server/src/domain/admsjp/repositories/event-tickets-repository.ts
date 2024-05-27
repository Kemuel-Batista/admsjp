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
  abstract findDetailsById(
    id: EventTicket['id'],
  ): Promise<EventTicketWithEventAndEventLot | null>

  abstract listByLot(lot: EventTicket['lot']): Promise<EventTicket[]>
  abstract listCloseToExpiry(): Promise<EventTicket[]>

  abstract findFirstLastUnexpiredByUserId(
    userId: EventTicket['userId'],
  ): Promise<EventTicket | null>

  abstract listDetailsByUserId(
    userId: EventTicket['userId'],
  ): Promise<EventTicketWithEventAndEventLot[]>

  abstract listDetailsByEventId(
    eventId: EventTicket['eventId'],
  ): Promise<EventTicketWithUserAndEventLot[]>

  abstract lastTicket(): Promise<string>
  abstract delete(id: EventTicket['id']): Promise<void>
}
