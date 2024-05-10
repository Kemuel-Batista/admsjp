import { Event, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ListEventDTO } from '../dtos/event'

export abstract class EventsRepository {
  abstract create(data: Prisma.EventUncheckedCreateInput): Promise<Event>
  abstract update(data: Event): Promise<Event>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventDTO>

  abstract findById(id: Event['id']): Promise<Event | null>
  abstract findByTitle(title: Event['title']): Promise<Event | null>
  abstract findBySlug(slug: Event['slug']): Promise<Event | null>
}
