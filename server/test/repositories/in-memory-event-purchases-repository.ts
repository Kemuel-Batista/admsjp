import { randomUUID } from 'node:crypto'

import { EventPurchase, Prisma } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository'
import { EventPurchaseWithEvent } from '@/domain/admsjp/types/event-purchase'

import { InMemoryEventsRepository } from './in-memory-events-repository'

export class InMemoryEventPurchasesRepository
  implements EventPurchasesRepository
{
  public items: EventPurchase[] = []

  constructor(private eventsRepository: InMemoryEventsRepository) {}

  async create(
    data: Prisma.EventPurchaseUncheckedCreateInput,
  ): Promise<EventPurchase> {
    const eventPurchase = {
      id: randomUUID(),
      invoiceNumber: data.invoiceNumber,
      eventId: data.eventId,
      buyerId: data.buyerId,
      status: data.status,
      expiresAt: new Date(data.expiresAt),
      createdAt: new Date(data.createdAt),
      updatedAt: null,
      deletedAt: null,
      deletedBy: null,
    }

    this.items.push(eventPurchase)

    return eventPurchase
  }

  async save(data: EventPurchase): Promise<EventPurchase> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      invoiceNumber: data.invoiceNumber,
      eventId: data.eventId,
      buyerId: data.buyerId,
      status: data.status,
      expiresAt: data.expiresAt,
      updatedAt: new Date(),
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async list(options?: IListOptions): Promise<EventPurchase[]> {
    const eventPurchases = this.items

    const { skip, take } = calcPagination(options)
    const paginatedEventPurchases = eventPurchases.slice(skip, skip + take)

    return paginatedEventPurchases
  }

  async listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: IListOptions,
  ): Promise<EventPurchaseWithEvent[]> {
    const eventPurchases = this.items

    const { skip, take } = calcPagination(options)
    const eventPurchasesWithEvent = eventPurchases
      .filter((item) => item.buyerId === buyerId)
      .slice(skip, skip + take)
      .map((item) => {
        const event = this.eventsRepository.items.find((event) => {
          return event.id === item.eventId
        })

        if (!event) {
          throw new Error(
            `Event with "${item.eventId.toString()}" does not exist.`,
          )
        }

        return {
          ...item,
          event: {
            title: event.title,
            slug: event.slug,
            initialDate: event.initialDate,
            finalDate: event.finalDate,
            imagePath: event.imagePath,
          },
        }
      })

    return eventPurchasesWithEvent
  }

  async listUnexpiredByUserId(
    buyerId: EventPurchase['buyerId'],
  ): Promise<EventPurchase[]> {
    const now = new Date()
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000)

    const eventTicket = this.items.filter(
      (item) =>
        item.buyerId === buyerId &&
        item.expiresAt > fifteenMinutesAgo &&
        item.expiresAt <= now,
    )

    return eventTicket
  }
}
