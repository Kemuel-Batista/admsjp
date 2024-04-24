import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Log, Prisma } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface LogProps extends Prisma.LogUncheckedCreateInput {}

export function makeLog(override: Partial<LogProps> = {}): LogProps {
  return {
    uuid: randomUUID(),
    process: faker.commerce.productAdjective(),
    value: faker.commerce.isbn(10),
    level: faker.number.int({ max: 100 }),
    userId: 1,
    ...override,
  }
}

@Injectable()
export class LogFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaLog(data: Partial<LogProps> = {}): Promise<Log> {
    const log = makeLog(data)

    const createdLog = await this.prisma.log.upsert({
      where: {
        uuid: log.uuid,
      },
      create: log,
      update: {},
    })

    return createdLog
  }
}
