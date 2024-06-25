/// <reference types="multer" />
import { z } from 'zod';
import { EditEventUseCase } from '@/domain/admsjp/use-cases/events/edit-event';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const editEventSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    initialDate: z.ZodEffects<z.ZodOptional<z.ZodString>, Date, string>;
    finalDate: z.ZodEffects<z.ZodOptional<z.ZodString>, Date, string>;
    status: z.ZodOptional<z.ZodNumber>;
    visible: z.ZodOptional<z.ZodNumber>;
    eventType: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    description?: string;
    initialDate?: Date;
    finalDate?: Date;
    status?: number;
    visible?: number;
    eventType?: number;
    message?: string;
}, {
    title?: string;
    description?: string;
    initialDate?: string;
    finalDate?: string;
    status?: number;
    visible?: number;
    eventType?: number;
    message?: string;
}>;
type EditEventSchema = z.infer<typeof editEventSchema>;
declare const EditEventParamsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof EditEventParamsSchema>;
export declare class EditEventController {
    private editEvent;
    constructor(editEvent: EditEventUseCase);
    handle(file: Express.Multer.File | undefined, body: EditEventSchema, eventId: ParamSchema, user: UserPayload): Promise<void>;
}
export {};
