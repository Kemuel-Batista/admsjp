import { ListEventPurchasesByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-user-id';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ListEventPurchasesByUserIdController {
    private listEventPurchasesByUserIdUseCase;
    constructor(listEventPurchasesByUserIdUseCase: ListEventPurchasesByUserIdUseCase);
    handle(user: UserPayload): Promise<{
        eventPurchases: ({
            event: {
                title: string;
                slug: string;
                initialDate: Date;
                finalDate: Date;
                imagePath: string;
            };
        } & {
            id: string;
            invoiceNumber: string;
            eventId: number;
            buyerId: number;
            status: number;
            expiresAt: Date;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
            deletedBy: number;
        })[];
    }>;
}
