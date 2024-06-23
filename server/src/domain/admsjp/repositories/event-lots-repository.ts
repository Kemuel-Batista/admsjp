import { EventLot, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ListEventLotsDTO } from '../dtos/event-lot'

export abstract class EventLotsRepository {
  abstract create(data: Prisma.EventLotUncheckedCreateInput): Promise<EventLot>
  abstract save(data: EventLot): Promise<EventLot>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO>

  abstract listByEventId(
    eventId: EventLot['eventId'],
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO>

  abstract findById(id: EventLot['id']): Promise<EventLot | null>
  abstract findMaxLotByEventId(eventId: EventLot['eventId']): Promise<number>
}
