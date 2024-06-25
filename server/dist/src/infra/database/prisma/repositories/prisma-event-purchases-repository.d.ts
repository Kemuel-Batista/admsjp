import { EventPurchase, Prisma } from '@prisma/client';
import { IListOptions } from '@/core/repositories/list-options';
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository';
import { EventPurchaseWithBuyer, EventPurchaseWithEvent, EventPurchaseWithEventTickets } from '@/domain/admsjp/types/event-purchase';
import { PrismaService } from '../prisma.service';
export declare class PrismaEventPurchasesRepository implements EventPurchasesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ buyerId, eventId, expiresAt, invoiceNumber, status, }: Prisma.EventPurchaseUncheckedCreateInput): Promise<EventPurchase>;
    save({ id, expiresAt, status }: EventPurchase): Promise<EventPurchase>;
    findById(id: EventPurchase['id']): Promise<EventPurchase | null>;
    lastInvoiceNumber(): Promise<string>;
    list(options?: IListOptions): Promise<EventPurchase[]>;
    listByBuyerId(buyerId: EventPurchase['buyerId'], options?: IListOptions): Promise<EventPurchaseWithEvent[]>;
    listUnexpiredByUserId(buyerId: EventPurchase['buyerId']): Promise<EventPurchaseWithEventTickets[]>;
    listBuyerDetailsByEventId(eventId: EventPurchase['eventId']): Promise<EventPurchaseWithBuyer[]>;
    listCloseToExpiry(): Promise<EventPurchase[]>;
    delete(id: EventPurchase['id']): Promise<void>;
}
