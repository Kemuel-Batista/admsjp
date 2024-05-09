import { EventAddress } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import {
  CreateEventAddressDTO,
  ListEventAddressesDTO,
  UpdateEventAddressDTO,
} from '../dtos/event-address'

export abstract class EventAddressesRepository {
  abstract create(data: CreateEventAddressDTO): Promise<EventAddress>
  abstract update(data: UpdateEventAddressDTO): Promise<EventAddress>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventAddressesDTO>

  abstract findById(id: EventAddress['id']): Promise<EventAddress | null>
  abstract findByEventId(
    eventId: EventAddress['eventId'],
  ): Promise<EventAddress | null>
}
