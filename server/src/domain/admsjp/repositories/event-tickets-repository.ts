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

  abstract update(data: EventTicket): Promise<EventTicket>

  abstract findById(id: EventTicket['id']): Promise<EventTicket | null>
  abstract findDetailsById(
    id: EventTicket['id'],
  ): Promise<EventTicketWithEventAndEventLot | null>

  abstract listByLot(lot: EventTicket['lot']): Promise<EventTicket[]>
  abstract listCloseToExpiry(): Promise<EventTicket[]>

  abstract ListUnexpiredByUserId(
    createdBy: EventTicket['createdBy'],
  ): Promise<EventTicket[]>

  abstract listDetailsByUserId(
    createdBy: EventTicket['createdBy'],
  ): Promise<EventTicketWithEventAndEventLot[]>

  abstract listDetailsByEventId(
    eventId: EventTicket['eventId'],
  ): Promise<EventTicketWithUserAndEventLot[]>

  abstract lastTicket(): Promise<string>
  abstract delete(id: EventTicket['id']): Promise<void>
}
