import { z } from 'zod';
import { GetDepartmentByIdUseCase } from '@/domain/admsjp/use-cases/departments/get-department-by-id';
declare const paramsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof paramsSchema>;
export declare class GetDepartmentByIdController {
    private getDepartmentById;
    constructor(getDepartmentById: GetDepartmentByIdUseCase);
    handle(id: ParamSchema): Promise<{
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
    }>;
}
export {};
