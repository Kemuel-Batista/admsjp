import { ChurchLeader as PrismaChurchLeader, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchLeader } from '@/domain/admsjp/enterprise/entities/church-leader'

export class PrismaChurchLeaderMapper {
  static toDomain(raw: PrismaChurchLeader): ChurchLeader {
    if (!raw.id) {
      throw new Error('Invalid church leader.')
    }

    return ChurchLeader.create(
      {
        churchId: new UniqueEntityID(raw.churchId),
        name: raw.name,
        functionName: raw.functionName,
        phone: raw.phone,
        email: raw.email,
        birthday: raw.birthday,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistencyMany(
    raw: ChurchLeader[],
  ): Prisma.ChurchLeaderCreateManyArgs {
    const data = raw.map((item) => ({
      id: item.id.toString(),
      churchId: item.churchId.toString(),
      name: item.name,
      functionName: item.functionName,
      phone: item.phone,
      email: item.email,
      birthday: item.birthday,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
    }))

    return {
      data,
    }
  }
}
