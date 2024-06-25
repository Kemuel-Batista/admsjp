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
    eventLotId: randomUUID(),
    eventPurchaseId: randomUUID(),
    qrCodeImage: faker.internet.url(),
    qrCodeText: faker.lorem.sentence(),
    birthday: faker.date.past(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    ticket: faker.commerce.isbn(13),
    cpf: '321313213131',
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
