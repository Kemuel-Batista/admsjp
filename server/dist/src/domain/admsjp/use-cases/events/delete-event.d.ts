import { Event } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventLotsRepository } from '../../repositories/event-lots-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
import { EventsRepository } from '../../repositories/events-repository';
interface DeleteEventUseCaseRequest {
    id: Event['id'];
}
type DeleteEventUseCaseResponse = Either<ResourceNotFoundError | ResourceHasAssociationsError, null>;
export declare class DeleteEventUseCase {
    private eventsRepository;
    private eventLotsRepository;
    private eventTicketsRepository;
    constructor(eventsRepository: EventsRepository, eventLotsRepository: EventLotsRepository, eventTicketsRepository: EventTicketsRepository);
    execute({ id, }: DeleteEventUseCaseRequest): Promise<DeleteEventUseCaseResponse>;
}
export {};
