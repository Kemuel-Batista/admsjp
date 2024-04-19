import { IDateProvider } from '@/core/providers/date-provider'

export class DateProvider implements IDateProvider {
  addDays(days: number, date?: Date): Date {
    const newDate = date || new Date()

    newDate.setDate(newDate.getDate() + days)

    return newDate
  }
}
