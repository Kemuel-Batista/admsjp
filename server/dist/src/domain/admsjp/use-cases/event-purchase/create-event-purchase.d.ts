import { EventPurchase } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error';
import { TicketGenerator } from '../../generators/ticket-generator';
import { EventLotsRepository } from '../../repositories/event-lots-repository';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
import { EventsRepository } from '../../repositories/events-repository';
import { UsersRepository } from '../../repositories/users-repository';
interface CreateEventPurchaseUseCaseRequest {
    eventId: number;
    buyerId: number;
    eventLotInfo: {
        eventLotId?: string;
        quantity?: number;
    }[];
}
type CreateEventPurchaseUseCaseResponse = Either<ResourceNotFoundError | TicketsSoldOutError, {
    eventPurchase: EventPurchase;
}>;
export declare class CreateEventPurchaseUseCase {
    private eventPurchasesRepository;
    private eventsRepository;
    private eventLotsRepository;
    private eventTicketsRepository;
    private usersRepository;
    private ticketGenerator;
    constructor(eventPurchasesRepository: EventPurchasesRepository, eventsRepository: EventsRepository, eventLotsRepository: EventLotsRepository, eventTicketsRepository: EventTicketsRepository, usersRepository: UsersRepository, ticketGenerator: TicketGenerator);
    execute({ eventId, buyerId, eventLotInfo, }: CreateEventPurchaseUseCaseRequest): Promise<CreateEventPurchaseUseCaseResponse>;
}
export {};
