import { EventAddress } from '@prisma/client';
import { Either } from '@/core/either';
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
import { InvalidEventTypeError } from '../../../../core/errors/errors/invalid-event-type-error';
interface EditEventAddressUseCaseRequest {
    id: EventAddress['id'];
    street: EventAddress['street'];
    number: EventAddress['number'];
    complement: EventAddress['complement'];
    neighborhood: EventAddress['neighborhood'];
    state: EventAddress['state'];
    city: EventAddress['city'];
    latitude: EventAddress['latitude'];
    longitude: EventAddress['longitude'];
    updatedBy: EventAddress['updatedBy'];
}
type EditEventAddressUseCaseResponse = Either<ResourceNotFoundError | IncorrectAssociationError | InvalidEventTypeError, {
    eventAddress: EventAddress;
}>;
export declare class EditEventAddressUseCase {
    private eventAddressesRepository;
    private eventsRepository;
    constructor(eventAddressesRepository: EventAddressesRepository, eventsRepository: EventsRepository);
    execute({ id, street, number, complement, neighborhood, state, city, latitude, longitude, updatedBy, }: EditEventAddressUseCaseRequest): Promise<EditEventAddressUseCaseResponse>;
}
export {};
