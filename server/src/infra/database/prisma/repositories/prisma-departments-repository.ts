import { DepartmentsRepository } from '@/domain/repositories/departments-repository'
import { Prisma, Department } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/paginations-params'

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

  async findMany({ page }: PaginationParams): Promise<Department[]> {
    const countrys = await this.prisma.department.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return countrys
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
