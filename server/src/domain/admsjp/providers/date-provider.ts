export abstract class IDateProvider {
  abstract addDays(days: number, date?: Date): Date
}
