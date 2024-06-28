import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { EventAddress, Prisma } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventAddressProps extends Prisma.EventAddressUncheckedCreateInput {}

export function makeEventAddress(
  override: Partial<EventAddressProps> = {},
): EventAddressProps {
  return {
    id: randomUUID(),
    street: faker.location.street(),
    number: String(faker.number.int({ max: 100 })),
    complement: faker.location.streetAddress(),
    neighborhood: faker.location.zipCode(),
    state: faker.number.int({ max: 100 }),
    city: faker.number.int({ max: 100 }),
    eventId: randomUUID(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    createdBy: randomUUID(),
    ...override,
  }
}

@Injectable()
export class EventAddressFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEventAddress(
    data: Partial<EventAddressProps> = {},
  ): Promise<EventAddress> {
    const eventAddress = makeEventAddress(data)

    const createdEventAddress = await this.prisma.eventAddress.upsert({
      where: {
        id: eventAddress.id,
      },
      create: eventAddress,
      update: {},
    })

    return createdEventAddress
  }
}
