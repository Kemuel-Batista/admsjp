import { Either } from '@/core/either';
import { LimitTimeNotExpiredError } from '@/core/errors/errors/limit-time-not-expired-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
interface CancelEventPurchaseByExpiredTimeUseCaseRequest {
    purchaseId: string;
}
type CancelEventPurchaseByExpiredTimeUseCaseResponse = Either<ResourceNotFoundError | LimitTimeNotExpiredError, null>;
export declare class CancelEventPurchaseByExpiredTimeUseCase {
    private eventPurchasesRepository;
    private eventTicketsRepository;
    constructor(eventPurchasesRepository: EventPurchasesRepository, eventTicketsRepository: EventTicketsRepository);
    execute({ purchaseId, }: CancelEventPurchaseByExpiredTimeUseCaseRequest): Promise<CancelEventPurchaseByExpiredTimeUseCaseResponse>;
}
export {};
