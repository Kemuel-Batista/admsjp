import {
  ChurchDepartment as PrismaChurchDepartment,
  Department as PrismaDeparment,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchDepartmentDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-department-details'

type PrismaChurchDepartmentDetails = PrismaChurchDepartment & {
  department: PrismaDeparment
}

export class PrismaChurchDepartmentDetailsMapper {
  static toDomain(raw: PrismaChurchDepartmentDetails): ChurchDepartmentDetails {
    return ChurchDepartmentDetails.create({
      churchDepartmentId: new UniqueEntityID(raw.id),
      churchId: new UniqueEntityID(raw.id),
      departmentId: new UniqueEntityID(raw.departmentId),
      departmentName: raw.department.name,
      username: raw.username,
    })
  }
}
