import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

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
  }: Prisma.OrderUncheckedCreateInput): Promise<void> {
    await this.prisma.order.create({
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
  }
}
