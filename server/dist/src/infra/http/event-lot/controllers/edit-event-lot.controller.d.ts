import { z } from 'zod';
import { EditEventLotUseCase } from '@/domain/admsjp/use-cases/event-lot/edit-event-lot';
declare const editEventLotSchema: z.ZodObject<{
    id: z.ZodString;
    eventId: z.ZodNumber;
    lot: z.ZodNumber;
    quantity: z.ZodNumber;
    value: z.ZodNumber;
    status: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: string;
    eventId?: number;
    lot?: number;
    quantity?: number;
    value?: number;
    status?: number;
}, {
    id?: string;
    eventId?: number;
    lot?: number;
    quantity?: number;
    value?: number;
    status?: number;
}>;
type EditEventLotSchema = z.infer<typeof editEventLotSchema>;
export declare class EditEventLotController {
    private editEventLot;
    constructor(editEventLot: EditEventLotUseCase);
    handle(body: EditEventLotSchema): Promise<void>;
}
export {};
