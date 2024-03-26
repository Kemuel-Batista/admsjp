import {
  Prisma,
  ChurchDepartment as PrismaChurchDepartment,
} from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'

export class PrismaChurchDepartmentMapper {
  static toDomain(raw: PrismaChurchDepartment): ChurchDepartment {
    if (!raw.id) {
      throw new Error('Invalid church department.')
    }

    return ChurchDepartment.create(
      {
        churchId: new UniqueEntityID(raw.churchId),
        departmentId: new UniqueEntityID(raw.departmentId),
        username: raw.username,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistency(
    raw: ChurchDepartment,
  ): Prisma.ChurchDepartmentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      churchId: raw.churchId.toString(),
      departmentId: raw.departmentId.toString(),
      username: raw.username,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    }
  }
}
