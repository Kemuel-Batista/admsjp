import { randomUUID } from 'node:crypto'

import { EventLot, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

export class InMemoryEventLotsRepository implements EventLotsRepository {
  public items: EventLot[] = []

  async create(data: Prisma.EventLotUncheckedCreateInput): Promise<EventLot> {
    const eventLot = {
      id: randomUUID(),
      eventId: data.eventId,
      name: data.name,
      description: data.description,
      lot: data.lot,
      quantity: data.quantity,
      fulfilledQuantity: data.fulfilledQuantity,
      value: data.value,
      status: data.status,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: null,
      updatedBy: null,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(eventLot)

    return eventLot
  }

  async save(data: EventLot): Promise<EventLot> {
    const itemIndex = this.items.findIndex(
      (item) => item.eventId === data.eventId && item.lot === data.lot,
    )

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      quantity: data.quantity,
      fulfilledQuantity: data.fulfilledQuantity,
      updatedAt: new Date(),
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async list(): Promise<EventLot[]> {
    const eventLots = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return eventLots
  }

  async listByEventId(
    eventId: EventLot['eventId'],
    options?: ListOptions,
  ): Promise<EventLot[]> {
    const { skip, take } = calcPagination(options)

    const eventLots = this.items
      .filter(
        (item) =>
          item.eventId === eventId && item.fulfilledQuantity <= item.quantity,
      )
      .slice(skip, skip + take)

    return eventLots
  }

  async findById(id: string): Promise<EventLot> {
    const eventLot = this.items.find((item) => item.id === id)

    if (!eventLot) {
      return null
    }

    return eventLot
  }

  async findMaxLotByEventId(eventId: EventLot['eventId']): Promise<number> {
    const eventLots = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.eventId === eventId)

    if (eventLots.length === 0) {
      return 0
    }

    let lastEventLot = eventLots[0].lot // Inicializa com o primeiro valor
    for (const eventLot of eventLots) {
      if (eventLot.lot > lastEventLot) {
        lastEventLot = eventLot.lot
      }
    }

    return lastEventLot
  }
}
