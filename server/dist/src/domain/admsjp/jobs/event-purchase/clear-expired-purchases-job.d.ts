import { Either } from '@/core/either';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { EventTicketsRepository } from '../../repositories/event-tickets-repository';
type ClearExpiredPurchasesJobResponse = Either<null, null>;
export declare class ClearExpiredPurchasesJob {
    private eventPurchasesRepository;
    private eventTicketsRepository;
    constructor(eventPurchasesRepository: EventPurchasesRepository, eventTicketsRepository: EventTicketsRepository);
    execute(): Promise<ClearExpiredPurchasesJobResponse>;
}
export {};
