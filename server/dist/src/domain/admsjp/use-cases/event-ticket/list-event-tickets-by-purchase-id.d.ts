import { EventTicket } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
import { EventTicketWithEventLot } from '../../types/event-ticket';
interface ListEventTicketsByPurchaseIdUseCaseRequest {
    purchaseId: EventTicket['eventPurchaseId'];
}
type ListEventTicketsByPurchaseIdUseCaseResponse = Either<ResourceNotFoundError, {
    eventTickets: EventTicketWithEventLot[];
}>;
export declare class ListEventTicketsByPurchaseIdUseCase {
    private eventTicketsRepository;
    private eventPurchasesRepository;
    constructor(eventTicketsRepository: EventTicketsRepository, eventPurchasesRepository: EventPurchasesRepository);
    execute({ purchaseId, }: ListEventTicketsByPurchaseIdUseCaseRequest): Promise<ListEventTicketsByPurchaseIdUseCaseResponse>;
}
export {};
