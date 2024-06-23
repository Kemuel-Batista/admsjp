import { randomUUID } from 'node:crypto'

import { EventLot, Prisma } from '@prisma/client'
import { applyFilters } from 'test/utils/filtering'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListEventLotsDTO } from '@/domain/admsjp/dtos/event-lot'
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

  async list(): Promise<ListEventLotsDTO> {
    const eventLots = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = eventLots.length

    return { eventLots, count }
  }

  async listByEventId(
    eventId: number,
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO> {
    let filteredEventLots = this.items

    searchParams.push({
      condition: 'equals',
      field: 'eventId',
      value: eventId,
    })

    if (searchParams && searchParams.length > 0) {
      const searchFilter = buildSearchFilter<EventLot>(searchParams)
      filteredEventLots = applyFilters<EventLot>(this.items, [searchFilter])
    }

    const { skip, take } = calcPagination(options)
    const paginatedEvents = filteredEventLots.slice(skip, skip + take)

    const count = filteredEventLots.length

    return { eventLots: paginatedEvents, count }
  }

  async findById(id: string): Promise<EventLot> {
    const eventLot = this.items.find((item) => item.id === id)

    if (!eventLot) {
      return null
    }

    return eventLot
  }

  async findMaxLotByEventId(eventId: number): Promise<number> {
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
