import { Church as PrismaChurch, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Church } from '@/domain/admsjp/enterprise/entities/church'

export class PrismaChurchMapper {
  static toDomain(raw: PrismaChurch): Church {
    return Church.create(
      {
        name: raw.name,
        description: raw.description,
        street: raw.street,
        neighborhood: raw.neighborhood,
        city: raw.city,
        state: raw.state,
        postalCode: raw.postalCode,
        number: raw.number,
        latitude: Number(raw.latitude),
        longitude: Number(raw.longitude),
        username: raw.username,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistency(raw: Church): Prisma.ChurchUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      description: raw.description,
      street: raw.street,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      postalCode: raw.postalCode,
      number: raw.number,
      latitude: Number(raw.latitude),
      longitude: Number(raw.longitude),
      username: raw.username,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    }
  }
}
