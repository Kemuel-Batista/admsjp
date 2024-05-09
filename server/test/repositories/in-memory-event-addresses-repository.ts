import { randomUUID } from 'node:crypto'

import { EventAddress } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateEventAddressDTO,
  ListEventAddressesDTO,
  UpdateEventAddressDTO,
} from '@/domain/admsjp/dtos/event-address'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

export class InMemoryEventAddressesRepository
  implements EventAddressesRepository
{
  public items: EventAddress[] = []

  async create(data: CreateEventAddressDTO): Promise<EventAddress> {
    const id = getLastInsertedId(this.items)

    const eventLot = {
      id,
      uuid: randomUUID(),
      eventId: data.eventId,
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      latitude: data.latitude,
      longitude: data.longitude,
      state: data.state,
      city: data.city,
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

  async update(data: UpdateEventAddressDTO): Promise<EventAddress> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      eventId: data.eventId,
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      latitude: data.latitude,
      longitude: data.longitude,
      state: data.state,
      city: data.city,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async list(): Promise<ListEventAddressesDTO> {
    const eventAddresses = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = eventAddresses.length

    return { eventAddresses, count }
  }

  async findById(id: number): Promise<EventAddress> {
    const eventAddress = this.items.find((item) => item.id === id)

    if (!eventAddress) {
      return null
    }

    return eventAddress
  }

  async findByEventId(eventId: number): Promise<EventAddress> {
    const eventAddress = this.items.find((item) => item.eventId === eventId)

    if (!eventAddress) {
      return null
    }

    return eventAddress
  }
}
