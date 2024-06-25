import { Order, Prisma } from '@prisma/client';
export declare abstract class OrdersRepository {
    abstract create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
    abstract update(data: Order): Promise<Order>;
    abstract findById(id: Order['id']): Promise<Order | null>;
    abstract listByTransactionId(transactionId: Order['transactionId']): Promise<Order[]>;
}
