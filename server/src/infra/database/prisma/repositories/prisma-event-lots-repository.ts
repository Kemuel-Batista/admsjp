import { Injectable } from '@nestjs/common'
import { EventLot, Prisma } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'
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
    id,
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
        id,
      },
      data: {
        eventId: eventId ?? undefined,
        lot: lot ?? undefined,
        name: name ?? undefined,
        description: description ?? undefined,
        quantity: quantity ?? undefined,
        fulfilledQuantity: fulfilledQuantity ?? undefined,
        updatedBy,
      },
    })

    return event
  }

  async list(options?: IListOptions): Promise<ListEventLotsDTO> {
    const { skip, take } = calcPagination(options)

    const [eventLots, count] = await this.prisma.$transaction([
      this.prisma.eventLot.findMany({
        skip,
        take,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.eventLot.count(),
    ])

    return { eventLots, count }
  }

  async listByEventId(
    eventId: EventLot['eventId'],
    options?: IListOptions,
  ): Promise<ListEventLotsDTO> {
    const { skip, take } = calcPagination(options)

    let [eventLots, count] = await this.prisma.$transaction([
      this.prisma.eventLot.findMany({
        where: {
          eventId,
        },
        skip,
        take,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.eventLot.count({
        where: {
          eventId,
        },
      }),
    ])

    eventLots = eventLots.filter(
      (item) => item.fulfilledQuantity <= item.quantity,
    )

    return { eventLots, count }
  }

  async findById(id: EventLot['id']): Promise<EventLot | null> {
    const eventLot = await this.prisma.eventLot.findUnique({
      where: {
        id,
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
