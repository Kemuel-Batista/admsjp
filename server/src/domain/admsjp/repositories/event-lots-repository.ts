import { EventLot, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class EventLotsRepository {
  abstract create(data: Prisma.EventLotUncheckedCreateInput): Promise<EventLot>
  abstract save(data: EventLot): Promise<EventLot>
  abstract list(options?: ListOptions): Promise<EventLot[]>

  abstract listByEventId(
    eventId: EventLot['eventId'],
    options?: ListOptions,
  ): Promise<EventLot[]>

  abstract findById(id: EventLot['id']): Promise<EventLot | null>
  abstract findMaxLotByEventId(eventId: EventLot['eventId']): Promise<number>
}
