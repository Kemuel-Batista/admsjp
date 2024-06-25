import { ClearExpiredPurchasesJob } from '@/domain/admsjp/jobs/event-purchase/clear-expired-purchases-job';
export declare class ClearExpiredPurchasesJobService {
    private clearExpiredPurchasesJob;
    constructor(clearExpiredPurchasesJob: ClearExpiredPurchasesJob);
    handleCron(): Promise<void>;
}
