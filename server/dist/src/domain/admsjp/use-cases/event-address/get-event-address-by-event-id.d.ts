import { EventAddress } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository';
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository';
interface GetEventAddressByEventIdUseCaseRequest {
    eventId: EventAddress['eventId'];
}
type GetEventAddressByEventIdUseCaseResponse = Either<ResourceNotFoundError, {
    eventAddress: EventAddress;
}>;
export declare class GetEventAddressByEventIdUseCase {
    private eventAddressesRepository;
    private eventsRepository;
    constructor(eventAddressesRepository: EventAddressesRepository, eventsRepository: EventsRepository);
    execute({ eventId, }: GetEventAddressByEventIdUseCaseRequest): Promise<GetEventAddressByEventIdUseCaseResponse>;
}
export {};
