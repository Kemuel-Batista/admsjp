import { EventPurchase } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { UsersRepository } from '../../repositories/users-repository';
import { EventPurchaseWithEventTickets } from '../../types/event-purchase';
interface ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseRequest {
    buyerId: EventPurchase['buyerId'];
}
type ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseResponse = Either<ResourceNotFoundError, {
    eventPurchases: EventPurchaseWithEventTickets[];
}>;
export declare class ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase {
    private eventPurchasesRepository;
    private usersRepository;
    constructor(eventPurchasesRepository: EventPurchasesRepository, usersRepository: UsersRepository);
    execute({ buyerId, }: ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseRequest): Promise<ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseResponse>;
}
export {};
