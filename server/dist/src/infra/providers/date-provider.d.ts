import { IDateProvider } from '@/domain/admsjp/providers/date-provider';
export declare class DateProvider implements IDateProvider {
    addDays(days: number, date?: Date): Date;
}
