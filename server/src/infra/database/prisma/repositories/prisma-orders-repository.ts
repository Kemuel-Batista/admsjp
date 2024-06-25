import { Injectable } from '@nestjs/common'
import { Order, Prisma } from '@prisma/client'

import { OrdersRepository } from '@/domain/admsjp/repositories/orders-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    transactionId,
    transactionType,
    paidAt,
    pixQrCode,
    attachment,
    status,
    paymentMethod,
  }: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        transactionId,
        transactionType,
        paidAt,
        pixQrCode,
        attachment,
        status,
        paymentMethod,
      },
    })

    return order
  }

  async update({ id, status, confirmedBy, paidAt }: Order): Promise<Order> {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
        confirmedBy,
        paidAt,
        updatedAt: new Date(),
      },
    })

    return order
  }

  async findById(id: Order['id']): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  }

  async listByTransactionId(transactionId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        transactionId,
      },
    })

    return orders
  }
}
