import { randomUUID } from 'node:crypto'

import { EventTicket, Prisma } from '@prisma/client'

import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventTicketWithEventLot } from '@/domain/admsjp/types/event-ticket'

import { InMemoryEventLotsRepository } from './in-memory-event-lots-repository'

export class InMemoryEventTicketsRepository implements EventTicketsRepository {
  public items: EventTicket[] = []

  constructor(private eventLotsRepository: InMemoryEventLotsRepository) {}

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

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
