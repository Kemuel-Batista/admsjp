import { randomUUID } from 'node:crypto'

import { EventTicket, Prisma } from '@prisma/client'

import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import {
  EventTicketWithEventAndEventLot,
  EventTicketWithUserAndEventLot,
} from '@/domain/admsjp/types/event-ticket'

import { InMemoryDepartmentsRepository } from './in-memory-departments-repository'
import { InMemoryEventLotsRepository } from './in-memory-event-lots-repository'
import { InMemoryEventsRepository } from './in-memory-events-repository'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryEventTicketsRepository implements EventTicketsRepository {
  public items: EventTicket[] = []

  constructor(
    private usersRepository: InMemoryUsersRepository,
    private departmentsRepository: InMemoryDepartmentsRepository,
    private eventsRepository: InMemoryEventsRepository,
    private eventLotsRepository: InMemoryEventLotsRepository,
  ) {}

  async create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket> {
    const eventTicket = {
      id: randomUUID(),
      eventId: data.eventId,
      cpf: data.cpf,
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthday: new Date(data.birthday),
      lot: data.lot,
      ticket: data.ticket,
      expiresAt: new Date(data.expiresAt) ?? null,
      createdBy: data.createdBy,
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

  async findById(id: string): Promise<EventTicket> {
    const eventTicket = this.items.find((item) => item.id === id)

    if (!eventTicket) {
      return null
    }

    return eventTicket
  }

  async findDetailsById(id: string): Promise<EventTicketWithEventAndEventLot> {
    const eventTicket = this.items.find((item) => item.id === id)

    const eventLot = this.eventLotsRepository.items.find((eventLot) => {
      return eventLot.lot === eventTicket.lot
    })

    if (!eventLot) {
      throw new Error(
        `Event Lot with lot "${eventTicket.lot.toString()}" does not exist.`,
      )
    }

    const event = this.eventsRepository.items.find((event) => {
      return event.id === eventTicket.eventId
    })

    if (!event) {
      throw new Error(
        `Event with "${eventTicket.eventId.toString()}" does not exist.`,
      )
    }

    const department = this.departmentsRepository.items.find((department) => {
      return department.id === event.departmentId
    })

    return {
      ...eventTicket,
      eventLot,
      event: {
        id: event.id,
        title: event.title,
        description: event.description,
        department: {
          name: department.name,
        },
        imagePath: event.imagePath,
        eventType: event.eventType,
      },
    }
  }

  async listByLot(lot: number): Promise<EventTicket[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.lot === lot)

    return eventTickets
  }

  async listCloseToExpiry(): Promise<EventTicket[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.expiresAt !== null)

    return eventTickets
  }

  async ListUnexpiredByUserId(userId: number): Promise<EventTicket[]> {
    const now = new Date()
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000)

    const eventTicket = this.items.filter(
      (item) =>
        item.createdBy === userId &&
        item.expiresAt > fifteenMinutesAgo &&
        item.expiresAt <= now,
    )

    return eventTicket
  }

  async listDetailsByUserId(
    userId: number,
  ): Promise<EventTicketWithEventAndEventLot[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.eventId === userId)
      .map((eventTicket) => {
        const eventLot = this.eventLotsRepository.items.find((eventLot) => {
          return eventLot.lot === eventTicket.lot
        })

        if (!eventLot) {
          throw new Error(
            `Event Lot with lot "${eventTicket.lot.toString()}" does not exist.`,
          )
        }

        const event = this.eventsRepository.items.find((event) => {
          return event.id === eventTicket.eventId
        })

        if (!event) {
          throw new Error(
            `Event with "${eventTicket.eventId.toString()}" does not exist.`,
          )
        }

        const department = this.departmentsRepository.items.find(
          (department) => {
            return department.id === event.departmentId
          },
        )

        return {
          ...eventTicket,
          eventLot,
          event: {
            id: event.id,
            title: event.title,
            description: event.description,
            department: {
              name: department.name,
            },
            imagePath: event.imagePath,
            eventType: event.eventType,
          },
        }
      })

    return eventTickets
  }

  async listDetailsByEventId(
    eventId: number,
  ): Promise<EventTicketWithUserAndEventLot[]> {
    const eventTickets = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.eventId === eventId)
      .map((eventTicket) => {
        const user = this.usersRepository.items.find((user) => {
          return user.id === eventTicket.createdBy
        })

        if (!user) {
          throw new Error(
            `User with ID "${eventTicket.createdBy.toString()}" does not exist.`,
          )
        }

        const eventLot = this.eventLotsRepository.items.find((eventLot) => {
          return eventLot.lot === eventTicket.lot
        })

        if (!eventLot) {
          throw new Error(
            `Event Lot with lot "${eventTicket.lot.toString()}" does not exist.`,
          )
        }

        return {
          ...eventTicket,
          user,
          eventLot,
        }
      })

    return eventTickets
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
