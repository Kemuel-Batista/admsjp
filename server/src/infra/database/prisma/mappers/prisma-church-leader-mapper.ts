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

  static toPersistency(
    raw: ChurchLeader,
  ): Prisma.ChurchLeaderUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      churchId: raw.churchId.toString(),
      name: raw.name,
      functionName: raw.functionName,
      phone: raw.phone,
      email: raw.email,
      birthday: raw.birthday,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    }
  }
}
