import { Injectable } from '@nestjs/common'
import { EventTicket, Prisma } from '@prisma/client'

import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventTicketWithUserAndEventLot } from '@/domain/admsjp/types/event-ticket'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventTicketsRepository implements EventTicketsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    userId,
    eventId,
    lot,
    ticket,
    expiresAt,
  }: Prisma.EventTicketUncheckedCreateInput): Promise<EventTicket> {
    const eventTicket = await this.prisma.eventTicket.create({
      data: {
        userId,
        eventId,
        lot,
        ticket,
        expiresAt,
      },
    })

    return eventTicket
  }

  async update({ expiresAt, uuid }: EventTicket): Promise<EventTicket> {
    const event = await this.prisma.eventTicket.update({
      where: {
        uuid,
      },
      data: {
        expiresAt,
      },
    })

    return event
  }

  async listByLot(lot: number): Promise<EventTicket[]> {
    const eventTickets = await this.prisma.eventTicket.findMany({
      where: {
        lot,
      },
    })

    return eventTickets
  }

  async listDetailsByEventId(
    eventId: number,
  ): Promise<EventTicketWithUserAndEventLot[]> {
    const eventTickets = await this.prisma.eventTicket.findMany({
      where: {
        eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        eventLot: {
          select: {
            lot: true,
          },
        },
      },
    })

    return eventTickets
  }

  async findByEventIdAndUserId(
    eventId: EventTicket['eventId'],
    userId: EventTicket['userId'],
  ): Promise<EventTicket | null> {
    const eventTicket = await this.prisma.eventTicket.findFirst({
      where: {
        eventId,
        AND: {
          userId,
        },
      },
    })

    return eventTicket
  }

  async lastTicket(): Promise<string> {
    const now = new Date()

    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const eventTickets = await this.prisma.eventTicket.findMany()

    const relevantTickets = eventTickets
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

    const maxTicket = relevantTickets.reduce((max, ticket) => {
      const ticketCount = parseInt(ticket.substring(12), 10) // Removendo "ANO_MES_DIA_EV_" e convertendo para número
      return Math.max(max, ticketCount)
    }, 0)

    return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}EV${maxTicket.toString().padStart(4, '0')}`
  }
}
