import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Department, Prisma } from '@prisma/client'

import {
  DepartmentStatus,
  DepartmentVisible,
} from '@/domain/admsjp/enums/department'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface DepartmentProps extends Prisma.DepartmentUncheckedCreateInput {}

export function makeDepartment(
  override: Partial<DepartmentProps> = {},
): DepartmentProps {
  return {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    status: DepartmentStatus.ACTIVE,
    visible: DepartmentVisible.VISIBLE,
    createdBy: 1,
    ...override,
  }
}

@Injectable()
export class DepartmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDepartment(
    data: Partial<DepartmentProps> = {},
  ): Promise<Department> {
    const department = makeDepartment(data)

    const createdDepartment = await this.prisma.department.upsert({
      where: {
        name: department.name,
      },
      create: department,
      update: {},
    })

    return createdDepartment
  }
}
