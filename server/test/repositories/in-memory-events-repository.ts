import { randomUUID } from 'node:crypto'

import { Event } from '@prisma/client'
import { EventProps } from 'test/factories/make-event'

import { ListOptions } from '@/core/repositories/list-options'
import { SearchParams } from '@/core/repositories/search-params'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Event[] = []

  async create(data: EventProps): Promise<Event> {
    const event = {
      id: randomUUID(),
      title: data.title,
      slug: data.slug,
      description: data.description,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
      status: data.status,
      visible: data.visible,
      departmentId: data.departmentId,
      eventType: data.eventType,
      imagePath: data.imagePath,
      message: data.message,
      pixKey: data.pixKey,
      pixType: data.pixType,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: null,
      updatedBy: null,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(event)

    return event
  }

  async update(data: Event): Promise<Event> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      title: data.title,
      slug: data.slug,
      description: data.description,
      initialDate: data.initialDate,
      finalDate: data.finalDate,
      status: data.status,
      visible: data.visible,
      departmentId: data.departmentId,
      eventType: data.eventType,
      imagePath: data.imagePath,
      message: data.message,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async list(
    options?: ListOptions,
    searchParams?: SearchParams[],
  ): Promise<Event[]> {
    const { skip, take } = calcPagination(options)

    const events = this.items.slice(skip, skip + take)

    return events
  }

  async findById(id: Event['id']): Promise<Event> {
    const event = this.items.find((item) => item.id === id)

    if (!event) {
      return null
    }

    return event
  }

  async findByTitle(title: string): Promise<Event> {
    const event = this.items.find((item) => item.title === title)

    if (!event) {
      return null
    }

    return event
  }

  async findBySlug(slug: string): Promise<Event> {
    const event = this.items.find((item) => item.slug === slug)

    if (!event) {
      return null
    }

    return event
  }

  async delete(id: Event['id']): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
