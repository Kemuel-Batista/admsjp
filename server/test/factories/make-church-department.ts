import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  ChurchDepartment,
  ChurchDepartmentProps,
} from '@/domain/admsjp/enterprise/entities/church-department'
import { PrismaChurchDepartmentMapper } from '@/infra/database/prisma/mappers/prisma-church-department-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeChurchDepartment(
  override: Partial<ChurchDepartmentProps> = {},
  id?: UniqueEntityID,
) {
  const churchDepartment = ChurchDepartment.create(
    {
      churchId: new UniqueEntityID(),
      departmentId: new UniqueEntityID(),
      username: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return churchDepartment
}

@Injectable()
export class ChurchDepartmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaChurchDepartment(
    data: Partial<ChurchDepartmentProps> = {},
  ): Promise<ChurchDepartment> {
    const churchDepartment = makeChurchDepartment(data)

    await this.prisma.churchDepartment.create({
      data: PrismaChurchDepartmentMapper.toPersistency(churchDepartment),
    })

    return churchDepartment
  }
}
