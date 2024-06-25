import { FilterFn, Row } from '@tanstack/react-table'
import { format } from 'date-fns'

export const includesDatetime: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: any,
) => {
  const originalValue: Date = row.getValue(columnId)
  const originalDate = new Date(originalValue)
  const dateOriginalValue = format(originalDate, 'dd/MM/yyyy hh:mm:ss')

  return dateOriginalValue.includes(filterValue)
}
