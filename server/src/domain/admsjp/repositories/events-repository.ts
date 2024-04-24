import { Event } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateEventDTO, ListEventDTO, UpdateEventDTO } from '../dtos/event'

export abstract class EventsRepository {
  abstract create(data: CreateEventDTO): Promise<Event>
  abstract update(data: UpdateEventDTO): Promise<Event>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventDTO>

  abstract findById(id: Event['id']): Promise<Event | null>
  abstract findByTitle(title: Event['title']): Promise<Event | null>
  abstract findBySlug(slug: Event['slug']): Promise<Event | null>
}
