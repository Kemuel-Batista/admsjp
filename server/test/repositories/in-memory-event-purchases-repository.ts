import { randomUUID } from 'node:crypto'

import { EventPurchase, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository'
import {
  EventPurchaseWithBuyer,
  EventPurchaseWithEvent,
  EventPurchaseWithEventTicketsAndLot,
} from '@/domain/admsjp/types/event-purchase'

import { InMemoryEventLotsRepository } from './in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from './in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from './in-memory-events-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryEventPurchasesRepository
  implements EventPurchasesRepository
{
  public items: EventPurchase[] = []

  constructor(
    private usersRepository: InMemoryUsersRepository,
    private eventsRepository: InMemoryEventsRepository,
    private eventLotsRepository: InMemoryEventLotsRepository,
    private eventTicketsRepository: InMemoryEventTicketsRepository,
  ) {}

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

  async findById(id: string): Promise<EventPurchase> {
    const eventPurchase = this.items.find((item) => item.id === id)

    if (!eventPurchase) {
      return null
    }

    return eventPurchase
  }

  async lastInvoiceNumber(): Promise<string> {
    const now = new Date()

    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const relevantTickets = this.items
      .filter((item) => {
        const itemYear = item.createdAt.getFullYear()
        const itemMonth = item.createdAt.getMonth() + 1
        const itemDay = item.createdAt.getDate()
        return itemYear === year && itemMonth === month && itemDay === day
      })
      .map((item) => item.invoiceNumber)

    if (relevantTickets.length === 0) {
      return ''
    }

    // Encontrando o maior ticket
    const maxTicket = relevantTickets.reduce((max, ticket) => {
      const ticketCount = parseInt(ticket.substring(12), 10) // Removendo "ANO_MES_DIA_PL_" e convertendo para número
      return Math.max(max, ticketCount)
    }, 0)

    return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}EV${maxTicket.toString().padStart(4, '0')}`
  }

  async list(options?: ListOptions): Promise<EventPurchase[]> {
    const eventPurchases = this.items

    const { skip, take } = calcPagination(options)
    const paginatedEventPurchases = eventPurchases.slice(skip, skip + take)

    return paginatedEventPurchases
  }

  async listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: ListOptions,
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
  ): Promise<EventPurchaseWithEventTicketsAndLot[]> {
    const now = new Date()
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000)

    const eventTicket = this.items
      .filter(
        (item) =>
          item.buyerId === buyerId &&
          item.expiresAt > fifteenMinutesAgo &&
          item.expiresAt <= now,
      )
      .map((item) => {
        const eventTickets = this.eventTicketsRepository.items
          .filter((eventTicket) => {
            return eventTicket.eventPurchaseId === item.id
          })
          .map((eventTicket) => {
            const eventLot = this.eventLotsRepository.items.find(
              (item) => item.id === eventTicket.eventLotId,
            )

            return {
              ...eventTicket,
              eventLot,
            }
          })

        return {
          ...item,
          eventTickets,
        }
      })

    return eventTicket
  }

  async listBuyerDetailsByEventId(
    eventId: EventPurchase['eventId'],
  ): Promise<EventPurchaseWithBuyer[]> {
    const eventPurchases = this.items
      .filter((item) => item.eventId === eventId)
      .map((eventPurchase) => {
        const user = this.usersRepository.items.find((item) => {
          return item.id === eventPurchase.buyerId
        })

        return {
          ...eventPurchase,
          user: {
            name: user.name,
            email: user.email,
          },
        }
      })

    return eventPurchases
  }

  async listCloseToExpiry(): Promise<EventPurchase[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.expiresAt !== null)

    return eventTickets
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
