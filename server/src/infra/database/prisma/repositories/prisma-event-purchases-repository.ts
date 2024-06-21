import { Injectable } from '@nestjs/common'
import { EventPurchase, Prisma } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository'
import { EventPurchaseWithEvent } from '@/domain/admsjp/types/event-purchase'

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

  async save({
    id,
    buyerId,
    eventId,
    expiresAt,
    invoiceNumber,
    status,
  }: EventPurchase): Promise<EventPurchase> {
    const eventPurchase = await this.prisma.eventPurchase.update({
      where: {
        id,
      },
      data: {
        buyerId: buyerId ?? undefined,
        eventId: eventId ?? undefined,
        expiresAt: expiresAt ?? undefined,
        invoiceNumber: invoiceNumber ?? undefined,
        status: status ?? undefined,
        updatedAt: new Date(),
      },
    })

    return eventPurchase
  }

  async list(options?: IListOptions): Promise<EventPurchase[]> {
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

  async listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: IListOptions,
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
  ): Promise<EventPurchase[]> {
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
    })

    return eventPurchases
  }
}
