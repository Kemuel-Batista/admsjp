import { randomUUID } from 'node:crypto'

import { Log, Prisma } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  ListLogByDateWithCount,
  LogsRepository,
} from '@/domain/admsjp/repositories/logs-repository'

export class InMemoryLogsRepository implements LogsRepository {
  public items: Log[] = []

  async log(data: Prisma.LogUncheckedCreateInput): Promise<void> {
    const id = getLastInsertedId(this.items)

    const log = {
      id,
      uuid: randomUUID(),
      process: data.process,
      value: data.value,
      oldValue: data.oldValue,
      timestamp: new Date(),
      level: data.level,
      userId: data.userId,
      note: data.note,
      jsonRequest: data.jsonRequest,
      jsonResponse: data.jsonResponse,
    }

    this.items.push(log)
  }

  async listByDate(
    level: number,
    dateInitial: Date,
    dateFinal: Date,
  ): Promise<ListLogByDateWithCount> {
    const logs = this.items.filter(
      (item) =>
        item.level === level &&
        dateInitial.getTime() >= item.timestamp.getTime() &&
        dateFinal.getTime() <= item.timestamp.getTime(),
    )

    const count = logs.length

    return { logs, count }
  }
}
