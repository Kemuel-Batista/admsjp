import { Order, Prisma } from '@prisma/client';
import { OrdersRepository } from '@/domain/admsjp/repositories/orders-repository';
import { PrismaService } from '../prisma.service';
export declare class PrismaOrdersRepository implements OrdersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ transactionId, transactionType, paidAt, pixQrCode, attachment, status, paymentMethod, }: Prisma.OrderUncheckedCreateInput): Promise<Order>;
    update({ id, status, confirmedBy, paidAt }: Order): Promise<Order>;
    findById(id: Order['id']): Promise<Order | null>;
    listByTransactionId(transactionId: string): Promise<Order[]>;
}
