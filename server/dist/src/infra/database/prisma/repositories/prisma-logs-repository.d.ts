import { Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListLogByDateWithCount, LogsRepository } from '@/domain/admsjp/repositories/logs-repository';
import { PrismaService } from '../prisma.service';
export declare class PrismaLogsRepository implements LogsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: Prisma.LogUncheckedCreateInput): Promise<void>;
    listByDate(level: number, dateInitial: Date, dateFinal: Date, options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListLogByDateWithCount>;
}
