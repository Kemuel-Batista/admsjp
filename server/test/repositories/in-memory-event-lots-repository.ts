import { randomUUID } from 'node:crypto'

import { EventLot } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateEventLotDTO,
  ListEventLotsDTO,
} from '@/domain/admsjp/dtos/event-lot'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

export class InMemoryEventLotsRepository implements EventLotsRepository {
  public items: EventLot[] = []

  async create(data: CreateEventLotDTO): Promise<EventLot> {
    const id = getLastInsertedId(this.items)

    const eventLot = {
      id,
      uuid: randomUUID(),
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

  async list(): Promise<ListEventLotsDTO> {
    const eventLots = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = eventLots.length

    return { eventLots, count }
  }

  async findById(id: number): Promise<EventLot> {
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
