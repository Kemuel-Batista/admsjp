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

  async delete(id: EventTicket['id']): Promise<void> {
    await this.prisma.eventTicket.delete({
      where: { id },
    })
  }
}
