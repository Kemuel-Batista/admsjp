import { Injectable } from '@nestjs/common'
import { EventPurchase, EventTicket, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
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
    shirtSize,
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
        shirtSize: shirtSize ?? undefined,
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
            name: true,
            lot: true,
            value: true,
          },
        },
      },
    })

    return eventTicket
  }

  async listByEventPurchaseId(
    eventPurchaseId: EventTicket['eventPurchaseId'],
    options?: ListOptions,
  ): Promise<EventTicketWithEventLot[]> {
    const { skip, take } = calcPagination(options)

    const eventTickets = await this.prisma.eventTicket.findMany({
      where: {
        eventPurchaseId,
      },
      skip,
      take,
      include: {
        eventLot: {
          select: {
            name: true,
            lot: true,
            value: true,
          },
        },
      },
    })

    return eventTickets
  }

  async listByEventLotId(
    eventLotId: EventTicket['eventLotId'],
  ): Promise<EventTicket[]> {
    const eventTickets = await this.prisma.eventTicket.findMany({
      where: {
        eventLotId,
      },
    })

    return eventTickets
  }

  async countByEventId(eventId: EventPurchase['eventId']): Promise<number> {
    const count = await this.prisma.eventTicket.count({
      where: {
        eventPurchase: {
          eventId,
          deletedAt: null,
        },
      },
    })

    return count
  }

  async delete(id: EventTicket['id']): Promise<void> {
    await this.prisma.eventTicket.delete({
      where: { id },
    })
  }
}
