import { EventAddress, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ListEventAddressesDTO } from '../dtos/event-address'

export abstract class EventAddressesRepository {
  abstract create(
    data: Prisma.EventAddressUncheckedCreateInput,
  ): Promise<EventAddress>

  abstract update(data: EventAddress): Promise<EventAddress>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventAddressesDTO>

  abstract findById(id: EventAddress['id']): Promise<EventAddress | null>
  abstract findByEventId(
    eventId: EventAddress['eventId'],
  ): Promise<EventAddress | null>
}
