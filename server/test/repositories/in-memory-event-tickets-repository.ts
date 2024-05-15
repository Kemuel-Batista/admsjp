import { randomUUID } from 'node:crypto'

import { EventTicket, Prisma } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'

export class InMemoryEventTicketsRepository implements EventTicketsRepository {
  public items: EventTicket[] = []

  async create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket> {
    const id = getLastInsertedId(this.items)

    const eventTicket = {
      id,
      uuid: randomUUID(),
      eventId: data.eventId,
      userId: data.userId,
      lot: data.lot,
      ticket: data.ticket,
      expiresAt: new Date(data.expiresAt) ?? null,
      createdAt: new Date(),
      updatedAt: null,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(eventTicket)

    return eventTicket
  }

  async update(data: EventTicket): Promise<EventTicket> {
    const itemIndex = this.items.findIndex(
      (item) => item.eventId === data.eventId && item.lot === data.lot,
    )

    const event = this.items[itemIndex]

    const eventUpdated = {
      ...event,
      expiresAt: data.expiresAt,
    }

    this.items[itemIndex] = eventUpdated

    return event
  }

  async findByEventIdAndUserId(
    eventId: number,
    userId: number,
  ): Promise<EventTicket | null> {
    const event = this.items.find(
      (item) => item.eventId === eventId && item.userId === userId,
    )

    if (!event) {
      return null
    }

    return event
  }

  async lastTicket(): Promise<string> {
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
      .map((item) => item.ticket)

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
}
