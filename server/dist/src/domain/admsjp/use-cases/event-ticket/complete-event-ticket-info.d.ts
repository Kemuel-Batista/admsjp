import { Either } from '@/core/either';
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
interface CompleteEventTicketInfoUseCaseRequest {
    id: string;
    eventPurchaseId: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthday: Date;
    requestedBy: number;
}
type CompleteEventTicketInfoUseCaseResponse = Either<ResourceNotFoundError | IncorrectAssociationError, null>;
export declare class CompleteEventTicketInfoUseCase {
    private eventTicketsRepository;
    private eventPurchasesRepository;
    constructor(eventTicketsRepository: EventTicketsRepository, eventPurchasesRepository: EventPurchasesRepository);
    execute({ id, eventPurchaseId, name, email, cpf, phone, birthday, requestedBy, }: CompleteEventTicketInfoUseCaseRequest): Promise<CompleteEventTicketInfoUseCaseResponse>;
}
export {};
