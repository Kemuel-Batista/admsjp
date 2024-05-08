import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Event, Prisma } from '@prisma/client'

import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventProps extends Prisma.EventUncheckedCreateInput {}

export function makeEvent(override: Partial<EventProps> = {}): EventProps {
  return {
    title: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentences(),
    initialDate: faker.date.soon(),
    finalDate: faker.date.future(),
    status: EventStatus.ACTIVE,
    visible: EventVisible.VISIBLE,
    departmentId: 1,
    eventType: EventType.REMOTO,
    imagePath: faker.image.url(),
    createdBy: 1,
    updatedBy: 1,
    ...override,
  }
}

@Injectable()
export class EventFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEvent(data: Partial<EventProps> = {}): Promise<Event> {
    const event = makeEvent(data)

    const createdEvent = await this.prisma.event.upsert({
      where: {
        title: event.title,
      },
      create: event,
      update: {},
    })

    return createdEvent
  }
}
