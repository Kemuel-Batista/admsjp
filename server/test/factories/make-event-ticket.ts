import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { EventTicket, Prisma } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventTicketProps extends Prisma.EventTicketUncheckedCreateInput {}

export function makeEventTicket(
  override: Partial<EventTicketProps> = {},
): EventTicketProps {
  return {
    id: randomUUID(),
    eventId: faker.number.int({ max: 10 }),
    lot: faker.number.int({ max: 10 }),
    ticket: faker.lorem.word(),
    expiresAt: faker.date.future(),
    createdBy: faker.number.int({ max: 10 }),
    ...override,
  }
}

@Injectable()
export class EventTicketFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEventTicket(
    data: Partial<EventTicketProps> = {},
  ): Promise<EventTicket> {
    const eventTicket = makeEventTicket(data)

    const createdEventTicket = await this.prisma.eventTicket.upsert({
      where: {
        id: eventTicket.id,
      },
      create: eventTicket,
      update: {},
    })

    return createdEventTicket
  }
}
