import { Event } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
interface GetEventByIdUseCaseRequest {
    id: Event['id'];
}
type GetEventByIdUseCaseResponse = Either<ResourceNotFoundError, {
    event: Event;
}>;
export declare class GetEventByIdUseCase {
    private eventsRepository;
    constructor(eventsRepository: EventsRepository);
    execute({ id, }: GetEventByIdUseCaseRequest): Promise<GetEventByIdUseCaseResponse>;
}
export {};
