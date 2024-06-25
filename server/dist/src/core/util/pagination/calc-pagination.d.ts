import { IListOptions } from '@/core/repositories/list-options';
interface ICalcPaginationReturn {
    skip: number | undefined;
    take: number | undefined;
}
export declare function calcPagination(options?: IListOptions): ICalcPaginationReturn;
export {};
