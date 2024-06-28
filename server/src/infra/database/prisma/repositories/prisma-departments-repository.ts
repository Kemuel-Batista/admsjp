import { Injectable } from '@nestjs/common'
import { Department, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaDepartmentRepository implements DepartmentsRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    name,
    description,
    status,
    visible,
    createdBy,
  }: Prisma.DepartmentUncheckedCreateInput): Promise<Department> {
    const department = await this.prisma.department.create({
      data: {
        name,
        description,
        status,
        visible,
        createdBy,
      },
    })
    return department
  }

  async update({
    id,
    name,
    description,
    status,
    visible,
    updatedBy,
  }: Department): Promise<Department> {
    const department = await this.prisma.department.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        status: status ?? undefined,
        visible: visible ?? undefined,
        updatedBy,
      },
    })

    return department
  }

  async list(options?: ListOptions): Promise<Department[]> {
    const { skip, take } = calcPagination(options)

    const departments = await this.prisma.department.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return departments
  }

  async findById(id: Department['id']): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    })

    return department
  }

  async findByName(name: Department['name']): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        name,
      },
    })

    return department
  }
}
