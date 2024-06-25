import { EventAddress } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository';
import { EventsRepository } from '../../repositories/events-repository';
export interface CreateEventAddressUseCaseRequest {
    eventId?: EventAddress['eventId'];
    street?: EventAddress['street'];
    number?: EventAddress['number'];
    complement?: EventAddress['complement'];
    neighborhood?: EventAddress['neighborhood'];
    state?: EventAddress['state'];
    city?: EventAddress['city'];
    latitude?: EventAddress['latitude'];
    longitude?: EventAddress['longitude'];
    createdBy?: EventAddress['createdBy'];
}
type CreateEventAddressUseCaseResponse = Either<ResourceNotFoundError, {
    eventAddress: EventAddress;
}>;
export declare class CreateEventAddressUseCase {
    private eventAddressesRepository;
    private eventsRepository;
    constructor(eventAddressesRepository: EventAddressesRepository, eventsRepository: EventsRepository);
    execute({ eventId, street, complement, neighborhood, number, city, state, latitude, longitude, createdBy, }: CreateEventAddressUseCaseRequest): Promise<CreateEventAddressUseCaseResponse>;
}
export {};
