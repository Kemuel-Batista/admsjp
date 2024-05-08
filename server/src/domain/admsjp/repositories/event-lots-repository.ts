import { EventLot } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateEventLotDTO, ListEventLotsDTO } from '../dtos/event-lot'

export abstract class EventLotsRepository {
  abstract create(data: CreateEventLotDTO): Promise<EventLot>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO>

  abstract findById(id: EventLot['id']): Promise<EventLot | null>
  abstract findMaxLotByEventId(eventId: EventLot['eventId']): Promise<number>
}
