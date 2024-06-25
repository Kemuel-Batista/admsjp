import { z } from 'zod';
import { CreateParameterUseCase } from '@/domain/admsjp/use-cases/parameters/create-parameter';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createParameterSchema: z.ZodObject<{
    key: z.ZodString;
    keyInfo: z.ZodString;
    value: z.ZodString;
    visible: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    key?: string;
    keyInfo?: string;
    value?: string;
    visible?: number;
    status?: number;
}, {
    key?: string;
    keyInfo?: string;
    value?: string;
    visible?: number;
    status?: number;
}>;
type CreateParameterSchema = z.infer<typeof createParameterSchema>;
export declare class CreateParameterController {
    private createParameter;
    constructor(createParameter: CreateParameterUseCase);
    handle(body: CreateParameterSchema, user: UserPayload): Promise<{
        parameter: import("@/core/either").Failure<import("@/core/errors/errors/resource-not-found-error").ResourceNotFoundError | import("@/core/errors/errors/resource-already-exists-error").ResourceAlreadyExistsError, {
            parameter: {
                id: number;
                uuid: string;
                key: string;
                keyInfo: string;
                value: string;
                status: number;
                visible: number;
                createdAt: Date;
                createdBy: number;
                updatedAt: Date;
                updatedBy: number;
            };
        }> | import("@/core/either").Success<import("@/core/errors/errors/resource-not-found-error").ResourceNotFoundError | import("@/core/errors/errors/resource-already-exists-error").ResourceAlreadyExistsError, {
            parameter: {
                id: number;
                uuid: string;
                key: string;
                keyInfo: string;
                value: string;
                status: number;
                visible: number;
                createdAt: Date;
                createdBy: number;
                updatedAt: Date;
                updatedBy: number;
            };
        }>;
    }>;
}
export {};
