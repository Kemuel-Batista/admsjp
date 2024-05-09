import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { EventLot, Prisma } from '@prisma/client'

import { EventLotStatus } from '@/domain/admsjp/enums/event-lot'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface EventLotProps extends Prisma.EventLotUncheckedCreateInput {}

export function makeEventLot(
  override: Partial<EventLotProps> = {},
): EventLotProps {
  return {
    eventId: faker.number.int({ max: 10 }),
    quantity: faker.number.int({ max: 10 }),
    lot: faker.number.int({ max: 10 }),
    value: faker.number.int({ max: 1000 }),
    status: EventLotStatus.ACTIVE,
    createdBy: 1,
    ...override,
  }
}

@Injectable()
export class EventLotFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEventLot(
    data: Partial<EventLotProps> = {},
  ): Promise<EventLot> {
    const eventLot = makeEventLot(data)

    const createdEventLot = await this.prisma.eventLot.upsert({
      where: {
        eventId_lot: {
          eventId: eventLot.eventId,
          lot: eventLot.lot,
        },
      },
      create: eventLot,
      update: {},
    })

    return createdEventLot
  }
}
