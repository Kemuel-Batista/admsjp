import { EventAddress, Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListEventAddressesDTO } from '@/domain/admsjp/dtos/event-address';
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository';
import { PrismaService } from '../prisma.service';
export declare class PrismaEventAddressesRepository implements EventAddressesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ eventId, street, neighborhood, number, complement, state, city, latitude, longitude, createdBy, }: Prisma.EventAddressUncheckedCreateInput): Promise<EventAddress>;
    update({ id, eventId, street, neighborhood, complement, state, city, latitude, longitude, updatedBy, }: EventAddress): Promise<EventAddress>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListEventAddressesDTO>;
    findById(id: number): Promise<EventAddress>;
    findByEventId(eventId: number): Promise<EventAddress>;
}
