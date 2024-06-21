import { Injectable } from '@nestjs/common'
import { EventLot, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListEventLotsDTO } from '@/domain/admsjp/dtos/event-lot'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventLotsRepository implements EventLotsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    description,
    eventId,
    quantity,
    lot,
    value,
    status,
    createdBy,
  }: Prisma.EventLotUncheckedCreateInput): Promise<EventLot> {
    const eventLot = await this.prisma.eventLot.create({
      data: {
        name,
        description,
        eventId,
        quantity,
        lot,
        value,
        status,
        createdBy,
      },
    })

    return eventLot
  }

  async save({
    name,
    description,
    eventId,
    lot,
    quantity,
    fulfilledQuantity,
    updatedBy,
  }: EventLot): Promise<EventLot> {
    const event = await this.prisma.eventLot.update({
      where: {
        eventId_lot: {
          eventId,
          lot,
        },
      },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        quantity: quantity ?? undefined,
        fulfilledQuantity: fulfilledQuantity ?? undefined,
        updatedBy,
      },
    })

    return event
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<EventLot>(searchParams)

    const [eventLots, count] = await this.prisma.$transaction([
      this.prisma.eventLot.findMany({
        where: search,
        skip,
        take,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.eventLot.count({ where: search }),
    ])

    return { eventLots, count }
  }

  async listByEventId(
    eventId: EventLot['eventId'],
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventLotsDTO> {
    const { skip, take } = calcPagination(options)

    searchParams.push({
      condition: 'equals',
      field: 'eventId',
      value: eventId,
    })

    const search = buildSearchFilter<EventLot>(searchParams)

    let [eventLots, count] = await this.prisma.$transaction([
      this.prisma.eventLot.findMany({
        where: search,
        skip,
        take,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.eventLot.count({ where: search }),
    ])

    eventLots = eventLots.filter(
      (item) => item.fulfilledQuantity <= item.quantity,
    )

    return { eventLots, count }
  }

  async findByEventIdAndLot(eventId: number, lot: number): Promise<EventLot> {
    const eventLot = await this.prisma.eventLot.findUnique({
      where: {
        eventId_lot: {
          eventId,
          lot,
        },
      },
    })

    return eventLot
  }

  async findMaxLotByEventId(eventId: number): Promise<number> {
    const eventLots = await this.prisma.eventLot.findMany({
      where: {
        eventId,
      },
    })

    if (eventLots.length === 0) {
      return null
    }

    let maxEventLot = eventLots[0].lot // Inicializa com o primeiro valor

    for (const eventLot of eventLots) {
      if (eventLot.lot > maxEventLot) {
        maxEventLot = eventLot.lot
      }
    }

    return maxEventLot
  }
}
