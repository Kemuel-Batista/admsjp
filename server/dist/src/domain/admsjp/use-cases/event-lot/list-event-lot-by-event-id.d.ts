import { EventLot } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { IListOptions } from '@/core/repositories/list-options';
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
interface ListEventLotByEventIdUseCaseRequest {
    eventId: EventLot['eventId'];
    options: IListOptions;
    searchParams: ISearchParamDTO[];
}
type ListEventLotByEventIdUseCaseResponse = Either<ResourceNotFoundError, {
    eventLots: EventLot[];
    count: number;
}>;
export declare class ListEventLotByEventIdUseCase {
    private eventLotsRepository;
    private eventsRepository;
    constructor(eventLotsRepository: EventLotsRepository, eventsRepository: EventsRepository);
    execute({ eventId, options, searchParams, }: ListEventLotByEventIdUseCaseRequest): Promise<ListEventLotByEventIdUseCaseResponse>;
}
export {};
