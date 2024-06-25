import { EventTicket, Prisma } from '@prisma/client';
import { IListOptions } from '@/core/repositories/list-options';
import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository';
import { EventTicketWithEventLot } from '@/domain/admsjp/types/event-ticket';
import { PrismaService } from '../prisma.service';
export declare class PrismaEventTicketsRepository implements EventTicketsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ eventLotId, eventPurchaseId, qrCodeImage, qrCodeText, ticket, }: Prisma.EventTicketUncheckedCreateInput): Promise<EventTicket>;
    save({ id, name, birthday, cpf, email, phone, }: EventTicket): Promise<EventTicket>;
    findById(id: EventTicket['id']): Promise<EventTicket | null>;
    findDetailsById(id: EventTicket['id']): Promise<EventTicketWithEventLot>;
    listByEventPurchaseId(eventPurchaseId: EventTicket['eventPurchaseId'], options?: IListOptions): Promise<EventTicketWithEventLot[]>;
    listByEventLotId(eventLotId: EventTicket['eventLotId']): Promise<EventTicket[]>;
    delete(id: EventTicket['id']): Promise<void>;
}
