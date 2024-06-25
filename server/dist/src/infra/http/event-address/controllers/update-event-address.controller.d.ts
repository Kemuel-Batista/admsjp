import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';
import { EditEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/edit-event-address';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const updateEventAddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodString>;
    neighborhood: z.ZodOptional<z.ZodString>;
    number: z.ZodOptional<z.ZodString>;
    complement: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodNumber>;
    city: z.ZodOptional<z.ZodNumber>;
    latitude: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodNumber, number, number>, Decimal, number>>;
    longitude: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodNumber, number, number>, Decimal, number>>;
}, "strip", z.ZodTypeAny, {
    street?: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
    state?: number;
    city?: number;
    latitude?: Decimal;
    longitude?: Decimal;
}, {
    street?: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
    state?: number;
    city?: number;
    latitude?: number;
    longitude?: number;
}>;
type UpdateEventAddressSchema = z.infer<typeof updateEventAddressSchema>;
declare const UpdateEventAddressParamsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof UpdateEventAddressParamsSchema>;
export declare class UpdateEventAddressController {
    private updateEventAddress;
    constructor(updateEventAddress: EditEventAddressUseCase);
    handle(body: UpdateEventAddressSchema, id: ParamSchema, user: UserPayload): Promise<void>;
}
export {};
