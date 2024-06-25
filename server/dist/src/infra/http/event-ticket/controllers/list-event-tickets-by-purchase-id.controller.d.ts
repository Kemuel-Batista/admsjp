import { ListEventTicketsByPurchaseIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id';
export declare class ListEventTicketsByPurchaseIdController {
    private listEventTicketsByPurchaseIdUseCase;
    constructor(listEventTicketsByPurchaseIdUseCase: ListEventTicketsByPurchaseIdUseCase);
    handle(purchaseId: string): Promise<{
        eventTickets: ({
            eventLot: {
                name: string;
                value: number;
                lot: number;
            };
        } & {
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
        })[];
    }>;
}
