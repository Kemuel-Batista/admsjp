import { z } from 'zod';
import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const completeEventTicketInfoSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        eventPurchaseId: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        cpf: z.ZodString;
        phone: z.ZodString;
        birthday: z.ZodEffects<z.ZodString, Date, string>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        eventPurchaseId?: string;
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
        birthday?: Date;
    }, {
        id?: string;
        eventPurchaseId?: string;
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
        birthday?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data?: {
        id?: string;
        eventPurchaseId?: string;
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
        birthday?: Date;
    }[];
}, {
    data?: {
        id?: string;
        eventPurchaseId?: string;
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
        birthday?: string;
    }[];
}>;
type CompleteEventTicketInfoSchema = z.infer<typeof completeEventTicketInfoSchema>;
export declare class CompleteEventTicketInfoController {
    private completeEventTicketInfo;
    constructor(completeEventTicketInfo: CompleteEventTicketInfoUseCase);
    handle(body: CompleteEventTicketInfoSchema, user: UserPayload): Promise<void>;
}
export {};
