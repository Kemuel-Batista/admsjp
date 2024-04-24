import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { EventSubscription, Prisma } from '@prisma/client'

import {
  EventSubscriptionStatus,
  PaymentMethod,
} from '@/domain/admsjp/enums/event-subscription'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventSubscriptionProps
  extends Prisma.EventSubscriptionUncheckedCreateInput {}

export function makeEventSubscription(
  override: Partial<EventSubscriptionProps> = {},
): EventSubscriptionProps {
  return {
    eventId: faker.number.int({ max: 10 }),
    ticket: faker.lorem.slug(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: EventSubscriptionStatus.APPROVED,
    paymentMethod: PaymentMethod.CARD,
    ...override,
  }
}

@Injectable()
export class EventSubscriptionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEventSubscription(
    data: Partial<EventSubscriptionProps> = {},
  ): Promise<EventSubscription> {
    const eventSubscription = makeEventSubscription(data)

    const createdEventSubscription = await this.prisma.eventSubscription.upsert(
      {
        where: {
          ticket: eventSubscription.ticket,
        },
        create: eventSubscription,
        update: {},
      },
    )

    return createdEventSubscription
  }
}
