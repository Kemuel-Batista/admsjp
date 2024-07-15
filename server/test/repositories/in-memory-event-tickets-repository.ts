import { randomUUID } from 'node:crypto'

import { EventPurchase, EventTicket, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventTicketWithEventLot } from '@/domain/admsjp/types/event-ticket'

import { InMemoryEventLotsRepository } from './in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from './in-memory-event-purchases-repository'

export class InMemoryEventTicketsRepository implements EventTicketsRepository {
  public items: EventTicket[] = []

  constructor(
    private eventLotsRepository: InMemoryEventLotsRepository,
    private eventPurchasesRepository: InMemoryEventPurchasesRepository,
  ) {}

  async create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket> {
    const eventTicket = {
      id: randomUUID(),
      eventPurchaseId: data.eventPurchaseId,
      eventLotId: data.eventLotId,
      ticket: data.ticket,
      qrCodeImage: data.qrCodeImage,
      qrCodeText: data.qrCodeText,
      cpf: data.cpf,
      name: data.name,
      email: data.email,
      phone: data.phone,
      shirtSize: data.shirtSize,
      birthday: new Date(data.birthday),
      createdAt: new Date(),
    }

    this.items.push(eventTicket)

    return eventTicket
  }

  async save(data: EventTicket): Promise<EventTicket> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      eventPurchaseId: data.eventPurchaseId,
      eventLotId: data.eventLotId,
      ticket: data.ticket,
      qrCodeImage: data.qrCodeImage,
      qrCodeText: data.qrCodeText,
      cpf: data.cpf,
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async findById(id: string): Promise<EventTicket> {
    const eventTicket = this.items.find((item) => item.id === id)

    if (!eventTicket) {
      return null
    }

    return eventTicket
  }

  async findDetailsById(id: string): Promise<EventTicketWithEventLot> {
    const eventTicket = this.items.find((item) => item.id === id)

    const eventLot = this.eventLotsRepository.items.find((eventLot) => {
      return eventLot.id === eventTicket.eventLotId
    })

    if (!eventLot) {
      throw new Error(
        `Event Lot with lot "${eventTicket.eventLotId.toString()}" does not exist.`,
      )
    }

    return {
      ...eventTicket,
      eventLot,
    }
  }

  async listByEventPurchaseId(
    eventPurchaseId: EventTicket['eventPurchaseId'],
    options?: ListOptions,
  ): Promise<EventTicketWithEventLot[]> {
    const eventPurchases = this.items

    const { skip, take } = calcPagination(options)
    const eventTickets = eventPurchases
      .filter((item) => item.eventPurchaseId === eventPurchaseId)
      .slice(skip, skip + take)
      .map((item) => {
        const eventLot = this.eventLotsRepository.items.find((eventLot) => {
          return eventLot.id === item.eventLotId
        })

        if (!eventLot) {
          throw new Error(
            `Event Lot with lot "${item.eventLotId.toString()}" does not exist.`,
          )
        }

        return {
          ...item,
          eventLot: {
            name: eventLot.name,
            lot: eventLot.lot,
            value: eventLot.value,
          },
        }
      })

    return eventTickets
  }

  async listByEventLotId(
    eventLotId: EventTicket['eventLotId'],
  ): Promise<EventTicket[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.eventLotId === eventLotId)

    return eventTickets
  }

  async countByEventId(eventId: EventPurchase['eventId']): Promise<number> {
    const eventPurchases = this.eventPurchasesRepository.items.filter(
      (eventPurchase) =>
        eventPurchase.eventId === eventId && eventPurchase.deletedAt === null,
    )

    const eventPurchaseIds = eventPurchases.map(
      (eventPurchase) => eventPurchase.id,
    )

    const count = this.items.filter((eventTicket) =>
      eventPurchaseIds.includes(eventTicket.eventPurchaseId),
    ).length

    return count
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
