import { Injectable } from '@nestjs/common'
import { EventPurchase, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListEventPurchasesByEventIdDTO } from '@/domain/admsjp/dtos/event-purchase/list-event-purchases-by-event-id-dto'
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository'
import {
  EventPurchaseWithBuyer,
  EventPurchaseWithEvent,
  EventPurchaseWithEventTicketsAndLot,
} from '@/domain/admsjp/types/event-purchase'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventPurchasesRepository
  implements EventPurchasesRepository
{
  constructor(private prisma: PrismaService) {}

  async create({
    buyerId,
    eventId,
    expiresAt,
    invoiceNumber,
    status,
  }: Prisma.EventPurchaseUncheckedCreateInput): Promise<EventPurchase> {
    const eventPurchase = await this.prisma.eventPurchase.create({
      data: {
        buyerId,
        eventId,
        expiresAt,
        invoiceNumber,
        status,
      },
    })

    return eventPurchase
  }

  async save({ id, expiresAt, status }: EventPurchase): Promise<EventPurchase> {
    const eventPurchase = await this.prisma.eventPurchase.update({
      where: {
        id,
      },
      data: {
        expiresAt,
        status: status ?? undefined,
        updatedAt: new Date(),
      },
    })

    return eventPurchase
  }

  async findById(id: EventPurchase['id']): Promise<EventPurchase | null> {
    const eventPurchase = await this.prisma.eventPurchase.findUnique({
      where: {
        id,
      },
    })

    return eventPurchase
  }

  async lastInvoiceNumber(): Promise<string> {
    const now = new Date()

    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()

    const eventPurchases = await this.prisma.eventPurchase.findMany()

    const relevantInvoiceNumbers = eventPurchases
      .filter((item) => {
        const itemYear = item.createdAt.getFullYear()
        const itemMonth = item.createdAt.getMonth() + 1
        const itemDay = item.createdAt.getDate()
        return itemYear === year && itemMonth === month && itemDay === day
      })
      .map((item) => item.invoiceNumber)

    if (relevantInvoiceNumbers.length === 0) {
      return ''
    }

    const maxInvoiceNumber = relevantInvoiceNumbers.reduce(
      (max, invoiceNumber) => {
        const invoiceNumberCount = parseInt(invoiceNumber.substring(12), 10) // Removendo "ANO_MES_DIA_EV_" e convertendo para número
        return Math.max(max, invoiceNumberCount)
      },
      0,
    )

    return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}EV${maxInvoiceNumber.toString().padStart(4, '0')}`
  }

  async list(options?: ListOptions): Promise<EventPurchase[]> {
    const { skip, take } = calcPagination(options)

    const eventPurchases = await this.prisma.eventPurchase.findMany({
      where: {
        deletedAt: null,
      },
      skip,
      take,
    })

    return eventPurchases
  }

  async listByEventId(
    eventId: EventPurchase['eventId'],
    options?: ListOptions,
  ): Promise<ListEventPurchasesByEventIdDTO> {
    const { skip, take } = calcPagination(options)

    const [eventPurchases, count] = await this.prisma.$transaction([
      this.prisma.eventPurchase.findMany({
        where: {
          deletedAt: null,
          eventId,
        },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
        skip,
        take,
        orderBy: [{ status: 'asc' }],
      }),
      this.prisma.eventPurchase.count({
        where: {
          deletedAt: null,
          eventId,
        },
      }),
    ])

    return { eventPurchases, count }
  }

  async listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: ListOptions,
  ): Promise<EventPurchaseWithEvent[]> {
    const { skip, take } = calcPagination(options)

    const eventPurchases = await this.prisma.eventPurchase.findMany({
      where: {
        deletedAt: null,
        buyerId,
      },
      skip,
      take,
      include: {
        event: {
          select: {
            title: true,
            slug: true,
            initialDate: true,
            finalDate: true,
            imagePath: true,
          },
        },
      },
    })

    return eventPurchases
  }

  async listUnexpiredByUserId(
    buyerId: EventPurchase['buyerId'],
  ): Promise<EventPurchaseWithEventTicketsAndLot[]> {
    const now = new Date()

    const eventPurchases = await this.prisma.eventPurchase.findMany({
      where: {
        buyerId,
        expiresAt: {
          gte: new Date(now.getTime() - 15 * 60 * 1000),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        eventTickets: {
          select: {
            id: true,
            eventLotId: true,
            eventPurchaseId: true,
            ticket: true,
            email: true,
            name: true,
            cpf: true,
            phone: true,
            qrCodeImage: true,
            qrCodeText: true,
            shirtSize: true,
            birthday: true,
            createdAt: true,
            eventLot: true,
            status: true,
            deliveredAt: true,
            deliveredBy: true,
            updatedAt: true,
            updatedBy: true,
          },
        },
      },
    })

    return eventPurchases
  }

  async listBuyerDetailsByEventId(
    eventId: EventPurchase['eventId'],
  ): Promise<EventPurchaseWithBuyer[]> {
    const eventPurchases = await this.prisma.eventPurchase.findMany({
      where: {
        eventId,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    return eventPurchases
  }

  async listCloseToExpiry(): Promise<EventPurchase[]> {
    const eventPurchases = await this.prisma.eventPurchase.findMany({
      where: {
        expiresAt: {
          not: null,
        },
      },
    })

    return eventPurchases
  }

  async countByEventId(eventId: EventPurchase['eventId']): Promise<number> {
    const count = await this.prisma.eventPurchase.count({
      where: {
        eventId,
        deletedAt: null,
      },
    })

    return count
  }

  async delete(id: EventPurchase['id']): Promise<void> {
    await this.prisma.eventPurchase.delete({
      where: { id },
    })
  }
}
