import { Order } from '@prisma/client';
import { Either } from '@/core/either';
import { OrdersRepository } from '../../repositories/orders-repository';
interface ListOrdersByTransactionIdUseCaseRequest {
    transactionId: Order['transactionId'];
}
type ListOrdersByTransactionIdUseCaseResponse = Either<null, {
    orders: Order[];
}>;
export declare class ListOrdersByTransactionIdUseCase {
    private ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    execute({ transactionId, }: ListOrdersByTransactionIdUseCaseRequest): Promise<ListOrdersByTransactionIdUseCaseResponse>;
}
export {};
