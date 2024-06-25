import { z } from 'zod';
import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createEventPurchaseSchema: z.ZodObject<{
    eventId: z.ZodNumber;
    eventLotInfo: z.ZodArray<z.ZodObject<{
        eventLotId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        eventLotId?: string;
        quantity?: number;
    }, {
        eventLotId?: string;
        quantity?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    eventId?: number;
    eventLotInfo?: {
        eventLotId?: string;
        quantity?: number;
    }[];
}, {
    eventId?: number;
    eventLotInfo?: {
        eventLotId?: string;
        quantity?: number;
    }[];
}>;
type CreateEventPurchaseSchema = z.infer<typeof createEventPurchaseSchema>;
export declare class CreateEventPurchaseController {
    private createEventPurchase;
    constructor(createEventPurchase: CreateEventPurchaseUseCase);
    handle(body: CreateEventPurchaseSchema, user: UserPayload): Promise<void>;
}
export {};
