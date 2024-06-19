import { dateTimeFormat } from '@/utils/date-time-format'

export const DateTimeCell = ({ getValue }: { getValue(): any }) => {
  const value = getValue()
  return <div>{dateTimeFormat(value)}</div>
}
