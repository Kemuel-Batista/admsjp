import { CancelEventPurchaseByExpiredTimeUseCase } from '@/domain/admsjp/use-cases/event-purchase/cancel-event-purchase-by-expired-time';
export declare class CancelEventPurchaseByExpiredTimeController {
    private cancelEventPurchaseByExpiredTime;
    constructor(cancelEventPurchaseByExpiredTime: CancelEventPurchaseByExpiredTimeUseCase);
    handle(purchaseId: string): Promise<void>;
}
