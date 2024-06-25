import { EventLot } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository';
import { EventsRepository } from '../../repositories/events-repository';
export interface CreateEventLotUseCaseRequest {
    name?: EventLot['name'];
    description?: EventLot['description'];
    eventId?: EventLot['eventId'];
    quantity?: EventLot['quantity'];
    lot?: EventLot['lot'];
    value?: EventLot['value'];
    status?: EventLot['status'];
    createdBy?: EventLot['createdBy'];
}
type CreateEventLotUseCaseResponse = Either<ResourceNotFoundError, {
    eventLot: EventLot;
}>;
export declare class CreateEventLotUseCase {
    private eventLotsRepository;
    private eventsRepository;
    constructor(eventLotsRepository: EventLotsRepository, eventsRepository: EventsRepository);
    execute({ name, description, eventId, quantity, status, value, createdBy, }: CreateEventLotUseCaseRequest): Promise<CreateEventLotUseCaseResponse>;
}
export {};
