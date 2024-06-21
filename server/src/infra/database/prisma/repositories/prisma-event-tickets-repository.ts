import { Injectable } from '@nestjs/common'
import { EventTicket, Prisma } from '@prisma/client'

import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventTicketWithEventLot } from '@/domain/admsjp/types/event-ticket'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventTicketsRepository implements EventTicketsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    eventLotId,
    eventPurchaseId,
    qrCodeImage,
    qrCodeText,
    ticket,
  }: Prisma.EventTicketUncheckedCreateInput): Promise<EventTicket> {
    const eventTicket = await this.prisma.eventTicket.create({
      data: {
        eventLotId,
        eventPurchaseId,
        qrCodeImage,
        qrCodeText,
        ticket,
      },
    })

    return eventTicket
  }

  async save({
    id,
    name,
    birthday,
    cpf,
    email,
    phone,
  }: EventTicket): Promise<EventTicket> {
    const event = await this.prisma.eventTicket.update({
      where: {
        id,
      },
      data: {
        name,
        birthday,
        cpf,
        email,
        phone,
      },
    })

    return event
  }

  async findById(id: EventTicket['id']): Promise<EventTicket | null> {
    const eventTicket = await this.prisma.eventTicket.findUnique({
      where: {
        id,
      },
    })

    return eventTicket
  }

  async findDetailsById(
    id: EventTicket['id'],
  ): Promise<EventTicketWithEventLot> {
    const eventTicket = await this.prisma.eventTicket.findUnique({
      where: {
        id,
      },
      include: {
        eventLot: {
          select: {
            lot: true,
            value: true,
          },
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

  async delete(id: EventTicket['id']): Promise<void> {
    await this.prisma.eventTicket.delete({
      where: { id },
    })
  }
}
