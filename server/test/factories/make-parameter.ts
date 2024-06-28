import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Parameter, Prisma } from '@prisma/client'

import {
  ParameterStatus,
  ParameterVisible,
} from '@/domain/admsjp/enums/parameter'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export interface ParameterProps
  extends Omit<Prisma.ParameterUncheckedCreateInput, 'createdAt'> {
  createdAt: Date
}

export function makeParameter(
  override: Partial<ParameterProps> = {},
): ParameterProps {
  return {
    key: faker.commerce.isbn(13),
    keyInfo: faker.lorem.slug(),
    value: faker.commerce.isbn(10),
    status: ParameterStatus.ACTIVE,
    visible: ParameterVisible.VISIBLE,
    createdBy: randomUUID(),
    createdAt: new Date(),
    ...override,
  }
}

@Injectable()
export class ParameterFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaParameter(
    data: Partial<ParameterProps> = {},
  ): Promise<Parameter> {
    const parameter = makeParameter(data)

    const createdParameter = await this.prisma.parameter.upsert({
      where: {
        key: parameter.key,
      },
      create: parameter,
      update: {},
    })

    return createdParameter
  }
}
