import { Injectable } from '@nestjs/common'
import { Log, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import {
  ListLogByDateWithCount,
  LogsRepository,
} from '@/core/repositories/logs-repository'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaLogsRepository implements LogsRepository {
  constructor(private prisma: PrismaService) {}

  async log(data: Prisma.LogUncheckedCreateInput): Promise<void> {
    await this.prisma.log.create({
      data: {
        process: data.process,
        value: data.value,
        oldValue: data.oldValue,
        level: data.level,
        userId: data.userId,
        note: data.note,
        jsonRequest: data.jsonRequest,
        jsonResponse: data.jsonResponse,
      },
    })
  }

  async listByDate(
    level: number,
    dateInitial: Date,
    dateFinal: Date,
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListLogByDateWithCount> {
    const { skip, take } = calcPagination(options)

    searchParams.push({
      field: 'level',
      condition: 'equals',
      value: level,
    })

    searchParams.push({
      field: 'timestamp',
      condition: 'lte',
      value: dateFinal,
    })

    searchParams.push({
      field: 'timestamp',
      condition: 'gte',
      value: dateInitial,
    })

    const search = buildSearchFilter<Log>(searchParams)

    const [logs, count] = await this.prisma.$transaction([
      this.prisma.log.findMany({
        where: search,
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
      this.prisma.log.count({
        where: search,
      }),
    ])

    return { logs, count }
  }
}
