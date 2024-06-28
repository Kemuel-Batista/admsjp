import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { EventPurchase, Prisma } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventPurchaseProps extends Prisma.EventPurchaseUncheckedCreateInput {}

export function makeEventPurchase(
  override: Partial<EventPurchaseProps> = {},
): EventPurchaseProps {
  return {
    id: randomUUID(),
    invoiceNumber: faker.commerce.isbn(13),
    buyerId: randomUUID(),
    eventId: randomUUID(),
    status: 1,
    expiresAt: faker.date.future(),
    ...override,
  }
}

@Injectable()
export class EventPurchaseFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEventPurchase(
    data: Partial<EventPurchaseProps> = {},
  ): Promise<EventPurchase> {
    const eventPurchase = makeEventPurchase(data)

    const createdEventPurchase = await this.prisma.eventPurchase.upsert({
      where: {
        id: eventPurchase.id,
      },
      create: eventPurchase,
      update: {},
    })

    return createdEventPurchase
  }
}
