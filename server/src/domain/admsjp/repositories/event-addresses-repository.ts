import { EventAddress, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class EventAddressesRepository {
  abstract create(
    data: Prisma.EventAddressUncheckedCreateInput,
  ): Promise<EventAddress>

  abstract update(data: EventAddress): Promise<EventAddress>
  abstract list(options?: ListOptions): Promise<EventAddress[]>

  abstract findById(id: EventAddress['id']): Promise<EventAddress | null>
  abstract findByEventId(
    eventId: EventAddress['eventId'],
  ): Promise<EventAddress | null>
}
