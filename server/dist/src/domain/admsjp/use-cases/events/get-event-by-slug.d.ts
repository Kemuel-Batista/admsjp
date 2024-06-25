import { Event } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
interface GetEventBySlugUseCaseRequest {
    slug: Event['slug'];
}
type GetEventBySlugUseCaseResponse = Either<ResourceNotFoundError, {
    event: Event;
}>;
export declare class GetEventBySlugUseCase {
    private eventsRepository;
    constructor(eventsRepository: EventsRepository);
    execute({ slug, }: GetEventBySlugUseCaseRequest): Promise<GetEventBySlugUseCaseResponse>;
}
export {};
