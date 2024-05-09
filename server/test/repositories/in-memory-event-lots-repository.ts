import { EventLot } from '@prisma/client'

import {
  CreateEventLotDTO,
  ListEventLotsDTO,
  UpdateEventLotDTO,
} from '@/domain/admsjp/dtos/event-lot'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

export class InMemoryEventLotsRepository implements EventLotsRepository {
  public items: EventLot[] = []

  async create(data: CreateEventLotDTO): Promise<EventLot> {
    const eventLot = {
      eventId: data.eventId,
      quantity: data.quantity,
      lot: data.lot,
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

  async update(data: UpdateEventLotDTO): Promise<EventLot> {
    const itemIndex = this.items.findIndex(
      (item) => item.eventId === data.eventId && item.lot === data.lot,
    )

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      quantity: data.quantity,
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

  async findByEventIdAndLot(eventId: number, lot: number): Promise<EventLot> {
    const eventLot = this.items.find(
      (item) => item.eventId === eventId && item.lot === lot,
    )

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
