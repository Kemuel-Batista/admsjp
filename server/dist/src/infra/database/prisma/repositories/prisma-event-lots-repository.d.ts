import { EventLot, Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListEventLotsDTO } from '@/domain/admsjp/dtos/event-lot';
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository';
import { PrismaService } from '../prisma.service';
export declare class PrismaEventLotsRepository implements EventLotsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ name, description, eventId, quantity, lot, value, status, createdBy, }: Prisma.EventLotUncheckedCreateInput): Promise<EventLot>;
    save({ id, name, description, eventId, lot, quantity, fulfilledQuantity, updatedBy, }: EventLot): Promise<EventLot>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListEventLotsDTO>;
    listByEventId(eventId: EventLot['eventId'], options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListEventLotsDTO>;
    findById(id: EventLot['id']): Promise<EventLot | null>;
    findMaxLotByEventId(eventId: number): Promise<number>;
}
