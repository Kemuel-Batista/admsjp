import { Event, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { SearchParams } from '@/core/repositories/search-params'

export abstract class EventsRepository {
  abstract create(data: Prisma.EventUncheckedCreateInput): Promise<Event>
  abstract update(data: Event): Promise<Event>
  abstract list(
    options?: ListOptions,
    searchParams?: SearchParams[],
  ): Promise<Event[]>

  abstract findById(id: Event['id']): Promise<Event | null>
  abstract findByTitle(title: Event['title']): Promise<Event | null>
  abstract findBySlug(slug: Event['slug']): Promise<Event | null>
  abstract delete(id: Event['id']): Promise<void>
}
