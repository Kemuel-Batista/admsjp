import { Event } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { IListOptions } from '@/core/repositories/list-options';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
interface ListPublicEventsUseCaseRequest {
    options?: IListOptions;
    searchParams?: ISearchParamDTO[];
}
type ListPublicEventsUseCaseResponse = Either<null, {
    events: Event[];
    count: number;
}>;
export declare class ListPublicEventsUseCase {
    private eventsRepository;
    constructor(eventsRepository: EventsRepository);
    execute({ options, searchParams, }: ListPublicEventsUseCaseRequest): Promise<ListPublicEventsUseCaseResponse>;
}
export {};
