import { Injectable } from '@nestjs/common'
import { Parameter, Prisma } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListParameterDTO } from '@/domain/admsjp/dtos/parameter'
import { ParametersRepository } from '@/domain/admsjp/repositories/parameters-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaParametersRepository implements ParametersRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    key,
    keyInfo,
    value,
    status,
    visible,
    createdBy,
  }: Prisma.ParameterUncheckedCreateInput): Promise<Parameter> {
    const parameter = await this.prisma.parameter.create({
      data: {
        key,
        keyInfo,
        value,
        status,
        visible,
        createdBy,
      },
    })

    return parameter
  }

  async update({
    id,
    key,
    keyInfo,
    value,
    status,
    visible,
    updatedBy,
  }: Parameter): Promise<Parameter> {
    const parameter = await this.prisma.parameter.update({
      where: {
        id,
      },
      data: {
        key: key ?? undefined,
        keyInfo: keyInfo ?? undefined,
        value: value ?? undefined,
        status: status ?? undefined,
        visible: visible ?? undefined,
        updatedBy,
      },
    })

    return parameter
  }

  async list(options?: IListOptions): Promise<ListParameterDTO> {
    const { skip, take } = calcPagination(options)

    const [parameters, count] = await this.prisma.$transaction([
      this.prisma.parameter.findMany({
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.parameter.count(),
    ])

    return { parameters, count }
  }

  async findById(id: Parameter['id']): Promise<Parameter | null> {
    const parameter = await this.prisma.parameter.findUnique({
      where: {
        id,
      },
    })

    return parameter
  }

  async findByKey(key: Parameter['key']): Promise<Parameter | null> {
    const parameter = await this.prisma.parameter.findUnique({
      where: {
        key,
      },
    })

    return parameter
  }
}
