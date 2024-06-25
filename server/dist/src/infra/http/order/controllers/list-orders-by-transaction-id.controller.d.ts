import { ListOrdersByTransactionIdUseCase } from '@/domain/admsjp/use-cases/orders/list-orders-by-transaction-id';
export declare class ListOrdersByTransactionIdController {
    private listOrdersByTransactionIdUseCase;
    constructor(listOrdersByTransactionIdUseCase: ListOrdersByTransactionIdUseCase);
    handle(transactionId: string): Promise<{
        orders: {
            id: number;
            uuid: string;
            transactionId: string;
            transactionType: "EVENTS";
            paymentMethod: number;
            status: number;
            pixQrCode: string;
            paidAt: Date;
            attachment: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
            deletedBy: number;
            confirmedBy: number;
        }[];
    }>;
}
