import { ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ListUnexpiredEventPurchasesWithDetailsByUserIdController {
    private listUnexpiredEventPurchasesWithDetailsByUserIdUseCase;
    constructor(listUnexpiredEventPurchasesWithDetailsByUserIdUseCase: ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase);
    handle(user: UserPayload): Promise<{
        eventPurchases: ({
            eventTickets: {
                id: string;
                eventPurchaseId: string;
                eventLotId: string;
                ticket: string;
                qrCodeImage: string;
                qrCodeText: string;
                cpf: string;
                name: string;
                email: string;
                phone: string;
                birthday: Date;
                createdAt: Date;
            }[];
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
