import { Event } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { IListOptions } from '@/core/repositories/list-options';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission';
interface ListEventsUseCaseRequest {
    profileId: UserWithPermission['profileId'];
    departmentId: UserWithPermission['departmentId'];
    options?: IListOptions;
    searchParams?: ISearchParamDTO[];
}
type ListEventsUseCaseResponse = Either<null, {
    events: Event[];
    count: number;
}>;
export declare class ListEventsUseCase {
    private eventsRepository;
    constructor(eventsRepository: EventsRepository);
    execute({ profileId, departmentId, options, searchParams, }: ListEventsUseCaseRequest): Promise<ListEventsUseCaseResponse>;
}
export {};
