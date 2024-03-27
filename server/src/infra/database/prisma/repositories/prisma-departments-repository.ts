import { Injectable } from '@nestjs/common'
import { Department, Prisma } from '@prisma/client'

import { PaginationParams } from '@/core/repositories/paginations-params'
import { DepartmentsRepository } from '@/domain/admsjp/application/repositories/departments-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDepartmentsRepository implements DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    })

    if (!department) {
      return null
    }

    return department
  }

  async findByName(name: string, id?: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        name,
        id,
      },
    })

    if (!department) {
      return null
    }

    return department
  }

  async findAll(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return departments
  }

  async findMany({ page }: PaginationParams): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return departments
  }

  async create(data: Prisma.DepartmentUncheckedCreateInput): Promise<void> {
    await this.prisma.department.create({
      data,
    })
  }

  async save(data: Department): Promise<void> {
    await this.prisma.department.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
