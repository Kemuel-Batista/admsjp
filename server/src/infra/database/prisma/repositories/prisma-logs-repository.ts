import { Injectable } from '@nestjs/common'
import { Log, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { LogsRepository } from '@/domain/admsjp/repositories/logs-repository'

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
    options?: ListOptions,
  ): Promise<Log[]> {
    const { skip, take } = calcPagination(options)

    const logs = await this.prisma.log.findMany({
      where: {
        level,
        timestamp: {
          lte: dateFinal,
          gte: dateInitial,
        },
      },
      skip,
      take,
      orderBy: { id: 'desc' },
    })

    return logs
  }
}
