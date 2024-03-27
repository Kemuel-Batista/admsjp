import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  ChurchLeader,
  ChurchLeaderProps,
} from '@/domain/admsjp/enterprise/entities/church-leader'
import { PrismaChurchLeaderMapper } from '@/infra/database/prisma/mappers/prisma-church-leader-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeChurchLeader(
  override: Partial<ChurchLeaderProps> = {},
  id?: UniqueEntityID,
) {
  const churchLeader = ChurchLeader.create(
    {
      churchId: new UniqueEntityID(),
      name: faker.person.fullName(),
      functionName: faker.person.jobArea(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      birthday: new Date(),
      ...override,
    },
    id,
  )

  return churchLeader
}

@Injectable()
export class ChurchLeaderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaChurchLeader(
    data: Partial<ChurchLeaderProps> = {},
  ): Promise<ChurchLeader> {
    const churchLeader = makeChurchLeader(data)

    await this.prisma.churchLeader.create({
      data: PrismaChurchLeaderMapper.toPersistency(churchLeader),
    })

    return churchLeader
  }
}
