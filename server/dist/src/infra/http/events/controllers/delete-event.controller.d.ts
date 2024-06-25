import { z } from 'zod';
import { DeleteEventUseCase } from '@/domain/admsjp/use-cases/events/delete-event';
declare const DeleteEventParamsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof DeleteEventParamsSchema>;
export declare class DeleteEventController {
    private deleteEvent;
    constructor(deleteEvent: DeleteEventUseCase);
    handle(eventId: ParamSchema): Promise<void>;
}
export {};
