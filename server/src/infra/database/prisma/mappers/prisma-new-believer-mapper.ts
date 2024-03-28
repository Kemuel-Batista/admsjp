import { NewBeliever as PrismaNewBeliever, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NewBeliever } from '@/domain/admsjp/enterprise/entities/new-believer'

export class PrismaNewBelieverMapper {
  static toDomain(raw: PrismaNewBeliever): NewBeliever {
    return NewBeliever.create(
      {
        churchId: new UniqueEntityID(raw.churchId),
        name: raw.name,
        lastName: raw.lastName,
        phone: raw.phone,
        email: raw.email,
        birthday: raw.birthday,
        street: raw.street,
        neighborhood: raw.neighborhood,
        city: raw.city,
        state: raw.state,
        postalCode: raw.postalCode,
        number: raw.number,
        status: raw.status,
        lgpd: raw.lgpd,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistency(
    raw: NewBeliever,
  ): Prisma.NewBelieverUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      churchId: raw.churchId.toString(),
      name: raw.name,
      lastName: raw.lastName,
      phone: raw.phone,
      email: raw.email,
      birthday: raw.birthday,
      street: raw.street,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      postalCode: raw.postalCode,
      number: raw.number,
      status: raw.status,
      lgpd: raw.lgpd,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    }
  }
}
