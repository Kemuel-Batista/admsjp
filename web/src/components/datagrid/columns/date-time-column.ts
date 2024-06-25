import { dateTimeFormat } from '@/utils/date-time-format'

import { DateTimeCell } from '../cells/date-time-cell'
import { includesDatetime } from '../filters/includes-datetime'

export const dateTimeColumn = {
  cell: DateTimeCell,
  format: dateTimeFormat,
  filterFn: includesDatetime,
  filterType: 'datetime',
}
