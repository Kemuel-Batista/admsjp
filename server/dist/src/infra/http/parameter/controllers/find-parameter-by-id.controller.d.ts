import { z } from 'zod';
import { FindParameterByIdUseCase } from '@/domain/admsjp/use-cases/parameters/find-parameter-by-id';
declare const findParameterParamSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof findParameterParamSchema>;
export declare class FindParameterByIdController {
    private findParameterById;
    constructor(findParameterById: FindParameterByIdUseCase);
    handle(id: ParamSchema): Promise<{
        parameter: import("@/core/either").Failure<import("@/core/errors/errors/resource-not-found-error").ResourceNotFoundError, {
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
        }> | import("@/core/either").Success<import("@/core/errors/errors/resource-not-found-error").ResourceNotFoundError, {
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
