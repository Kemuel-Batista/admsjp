import { z } from 'zod';
import { CreateDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/create-department';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createDepartmentSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    visible: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    visible?: number;
    status?: number;
}, {
    name?: string;
    description?: string;
    visible?: number;
    status?: number;
}>;
type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;
export declare class CreateDepartmentController {
    private createDepartment;
    constructor(createDepartment: CreateDepartmentUseCase);
    handle(body: CreateDepartmentSchema, user: UserPayload): Promise<import("@/core/either").Failure<import("@/core/errors/errors/resource-already-exists-error").ResourceAlreadyExistsError, {
        department: {
            id: number;
            uuid: string;
            name: string;
            description: string;
            status: number;
            visible: number;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
            deletedAt: Date;
            deletedBy: number;
        };
    }> | import("@/core/either").Success<import("@/core/errors/errors/resource-already-exists-error").ResourceAlreadyExistsError, {
        department: {
            id: number;
            uuid: string;
            name: string;
            description: string;
            status: number;
            visible: number;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
            deletedAt: Date;
            deletedBy: number;
        };
    }>>;
}
export {};
