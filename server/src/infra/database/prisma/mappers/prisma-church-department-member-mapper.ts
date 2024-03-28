import {
  ChurchDepartmentMember as PrismaChurchDepartmentMember,
  Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchDepartmentMember } from '@/domain/admsjp/enterprise/entities/church-department-member'

export class PrismaChurchDepartmentMemberMapper {
  static toDomain(raw: PrismaChurchDepartmentMember): ChurchDepartmentMember {
    if (!raw.id) {
      throw new Error('Invalid church department.')
    }

    return ChurchDepartmentMember.create(
      {
        churchDepartmentId: new UniqueEntityID(raw.churchDepartmentId),
        name: raw.name,
        functionName: raw.functionName,
        subFunction: raw.subFunction,
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
    raw: ChurchDepartmentMember,
  ): Prisma.ChurchDepartmentMemberUncheckedCreateInput {
    return {
      churchDepartmentId: raw.churchDepartmentId.toString(),
      name: raw.name,
      functionName: raw.functionName,
      subFunction: raw.subFunction,
      phone: raw.phone,
      email: raw.email,
      birthday: raw.birthday,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    }
  }
}
