import { Log, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '../dtos/search-param-dto'
import { IListOptions } from './list-options'

export interface ListLogByDateWithCount {
  logs: Log[]
  count: number
}

export abstract class LogsRepository {
  abstract log(data: Prisma.LogUncheckedCreateInput): Promise<void>
  abstract listByDate(
    level: Log['level'],
    dateInitial: Date,
    dateFinal: Date,
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListLogByDateWithCount>
}
