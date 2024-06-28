import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { Order, Prisma } from '@prisma/client'

import { OrderPaymentMethod, OrderStatus } from '@/domain/admsjp/enums/order'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface OrderProps extends Prisma.OrderUncheckedCreateInput {}

export function makeOrder(override: Partial<OrderProps> = {}): OrderProps {
  return {
    id: randomUUID(),
    transactionId: randomUUID(),
    paymentMethod: OrderPaymentMethod.PIX,
    status: OrderStatus.PENDING,
    ...override,
  }
}

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
    const order = makeOrder(data)

    const createdOrder = await this.prisma.order.upsert({
      where: {
        id: order.id,
      },
      create: order,
      update: {},
    })

    return createdOrder
  }
}
