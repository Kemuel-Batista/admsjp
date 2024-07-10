import { Order, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { OrdersRepository } from '@/domain/admsjp/repositories/orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: randomUUID(),
      transactionId: data.transactionId,
      transactionType: data.transactionType,
      paymentMethod: data.paymentMethod,
      status: data.status,
      pixQrCode: data.pixQrCode,
      paidAt: new Date(data.paidAt),
      attachment: data.attachment,
      createdAt: new Date(),
      updatedAt: null,
      deletedBy: null,
      deletedAt: null,
      confirmedBy: null,
    }

    this.items.push(order)

    return order
  }

  async update(data: Order): Promise<Order> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const order = this.items[itemIndex]

    const orderUpdated = {
      ...order,
      transactionType: data.transactionType,
      paymentMethod: data.paymentMethod,
      status: data.status,
      pixQrCode: data.pixQrCode,
      paidAt: data.paidAt,
      attachment: data.attachment,
      deletedAt: data.deletedAt,
      deletedBy: data.deletedBy,
      confirmedBy: data.confirmedBy,
      updatedAt: new Date(),
    }

    this.items[itemIndex] = orderUpdated

    return order
  }

  async findById(id: Order['id']): Promise<Order> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    return order
  }

  async findByTransactionId(transactionId: string): Promise<Order> {
    const order = this.items.find(
      (item) => item.transactionId === transactionId,
    )

    if (!order) {
      return null
    }

    return order
  }

  async listByTransactionId(transactionId: string): Promise<Order[]> {
    const orders = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.transactionId === transactionId)

    return orders
  }
}
