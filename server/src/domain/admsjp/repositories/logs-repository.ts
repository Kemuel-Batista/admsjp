import { Log, Prisma } from '@prisma/client'

import { ListOptions } from '../../../core/repositories/list-options'

export abstract class LogsRepository {
  abstract log(data: Prisma.LogUncheckedCreateInput): Promise<void>
  abstract listByDate(
    level: Log['level'],
    dateInitial: Date,
    dateFinal: Date,
    options?: ListOptions,
  ): Promise<Log[]>
}
