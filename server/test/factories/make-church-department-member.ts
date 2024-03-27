import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  ChurchDepartmentMember,
  ChurchDepartmentMemberProps,
} from '@/domain/admsjp/enterprise/entities/church-department-member'
import { PrismaChurchDepartmentMemberMapper } from '@/infra/database/prisma/mappers/prisma-church-department-member-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeChurchDepartmentMember(
  override: Partial<ChurchDepartmentMemberProps> = {},
  id?: UniqueEntityID,
) {
  const churchDepartmentMember = ChurchDepartmentMember.create(
    {
      churchDepartmentId: new UniqueEntityID(),
      name: faker.person.fullName(),
      functionName: faker.person.jobArea(),
      subFunction: faker.person.jobTitle(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      birthday: new Date(),
      ...override,
    },
    id,
  )

  return churchDepartmentMember
}

@Injectable()
export class ChurchDepartmentMemberFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaChurchDepartmentMember(
    data: Partial<ChurchDepartmentMemberProps> = {},
  ): Promise<ChurchDepartmentMember> {
    const churchDepartmentMember = makeChurchDepartmentMember(data)

    await this.prisma.churchDepartmentMember.create({
      data: PrismaChurchDepartmentMemberMapper.toPersistency(
        churchDepartmentMember,
      ),
    })

    return churchDepartmentMember
  }
}
