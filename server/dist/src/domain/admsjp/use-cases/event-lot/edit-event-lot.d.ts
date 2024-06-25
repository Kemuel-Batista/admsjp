import { Either } from '@/core/either';
import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventLotsRepository } from '../../repositories/event-lots-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
interface EditEventLotUseCaseRequest {
    id: string;
    eventId: number;
    lot: number;
    quantity: number;
    value: number;
    status: number;
}
type EditEventLotUseCaseResponse = Either<ResourceNotFoundError | ResourceHasAssociationsError, null>;
export declare class EditEventLotUseCase {
    private eventLotsRepository;
    private eventTicketsRepository;
    constructor(eventLotsRepository: EventLotsRepository, eventTicketsRepository: EventTicketsRepository);
    execute({ id, lot, quantity, value, status, }: EditEventLotUseCaseRequest): Promise<EditEventLotUseCaseResponse>;
}
export {};
