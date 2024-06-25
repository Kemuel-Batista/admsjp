import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { UsersRepository } from '../../repositories/users-repository';
import { EventPurchaseWithEvent } from '../../types/event-purchase';
interface ListEventPurchasesByUserIdUseCaseRequest {
    buyerId: number;
}
type ListEventPurchasesByUserIdUseCaseResponse = Either<ResourceNotFoundError, {
    eventPurchases: EventPurchaseWithEvent[];
}>;
export declare class ListEventPurchasesByUserIdUseCase {
    private eventPurchasesRepository;
    private usersRepository;
    constructor(eventPurchasesRepository: EventPurchasesRepository, usersRepository: UsersRepository);
    execute({ buyerId, }: ListEventPurchasesByUserIdUseCaseRequest): Promise<ListEventPurchasesByUserIdUseCaseResponse>;
}
export {};
