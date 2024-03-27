import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class DepartmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDepartment(): Promise<Department> {
    const department = await this.prisma.department.create({
      data: {
        name: faker.person.fullName(),
        description: faker.person.jobDescriptor(),
      },
    })

    return department
  }
}
