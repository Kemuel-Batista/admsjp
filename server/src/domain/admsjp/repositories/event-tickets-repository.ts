import { EventTicket, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

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

  abstract listByEventPurchaseId(
    eventPurchaseId: EventTicket['eventPurchaseId'],
    options?: ListOptions,
  ): Promise<EventTicketWithEventLot[]>

  abstract listByEventLotId(
    eventLotId: EventTicket['eventLotId'],
  ): Promise<EventTicket[]>

  abstract delete(id: EventTicket['id']): Promise<void>
}
