import { EventTicket, Prisma } from '@prisma/client'

import { EventTicketWithEventLot } from '../types/event-ticket'

export abstract class EventTicketsRepository {
  abstract create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket>

  abstract save(data: EventTicket): Promise<EventTicket>
  abstract findById(id: EventTicket['id']): Promise<EventTicket | null>
  abstract findDetailsById(
    id: EventTicket['id'],
  ): Promise<EventTicketWithEventLot | null>

  abstract lastTicket(): Promise<string>
  abstract delete(id: EventTicket['id']): Promise<void>
}
