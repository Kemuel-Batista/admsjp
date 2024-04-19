import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/buildSearchFilter'
import { calcPagination } from '@/core/util/pagination/calcPagination'
import { CreateDepartmentDTO } from '@/domain/departments/dtos/create-department.dto'
import { ListDepartmentDTO } from '@/domain/departments/dtos/list-department.dto'
import { UpdateDepartmentDTO } from '@/domain/departments/dtos/update-department.dto'
import { DepartmentsRepository } from '@/domain/departments/repositories/departments-repository'
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
  }: CreateDepartmentDTO): Promise<Department> {
    const department = await this.prisma.department.create({
      data: {
        name,
        description,
        status,
        visible,
        createdBy,
        updatedBy: createdBy,
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
  }: UpdateDepartmentDTO): Promise<Department> {
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

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListDepartmentDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<Department>(searchParams)

    const [departments, count] = await this.prisma.$transaction([
      this.prisma.department.findMany({
        where: search,
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.department.count({ where: search }),
    ])

    return { departments, count }
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
