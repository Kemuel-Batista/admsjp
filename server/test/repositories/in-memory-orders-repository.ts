import { Order, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import { OrdersRepository } from '@/domain/admsjp/repositories/orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<void> {
    const id = getLastInsertedId(this.items)

    const order = {
      id,
      uuid: randomUUID(),
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
    }

    this.items.push(order)
  }
}
