import { z } from 'zod';
import { GetEventAddressByEventIdUseCase } from '@/domain/admsjp/use-cases/event-address/get-event-address-by-event-id';
declare const paramsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof paramsSchema>;
export declare class GetEventAddressByEventIdController {
    private getEventAddressByEventId;
    constructor(getEventAddressByEventId: GetEventAddressByEventIdUseCase);
    handle(eventId: ParamSchema): Promise<{
        eventAddress: {
            id: number;
            uuid: string;
            eventId: number;
            street: string;
            number: string;
            complement: string;
            neighborhood: string;
            state: number;
            city: number;
            latitude: import("@prisma/client/runtime/library").Decimal;
            longitude: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
            deletedAt: Date;
            deletedBy: number;
        };
    }>;
}
export {};
