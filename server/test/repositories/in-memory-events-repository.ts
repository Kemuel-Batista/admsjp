import { randomUUID } from 'node:crypto'

import { Event } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateEventDTO,
  ListEventDTO,
  UpdateEventDTO,
} from '@/domain/admsjp/dtos/event'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Event[] = []

  async create(data: CreateEventDTO): Promise<Event> {
    const id = getLastInsertedId(this.items)

    const event = {
      id,
      uuid: randomUUID(),
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
      createdBy: data.createdBy,
      updatedAt: null,
      updatedBy: null,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(event)

    return event
  }

  async update(data: UpdateEventDTO): Promise<Event> {
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

  async list(): Promise<ListEventDTO> {
    const events = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = events.length

    return { events, count }
  }

  async findById(id: number): Promise<Event> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByTitle(title: string): Promise<Event> {
    const user = this.items.find((item) => item.title === title)

    if (!user) {
      return null
    }

    return user
  }

  async findBySlug(slug: string): Promise<Event> {
    const user = this.items.find((item) => item.slug === slug)

    if (!user) {
      return null
    }

    return user
  }
}
