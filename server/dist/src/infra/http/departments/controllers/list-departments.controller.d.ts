import { type Request, type Response } from 'express';
import { PageQueryParamSchema } from '@/core/schemas/query-params-schema';
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list-department';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ListDepartmentsController {
    private listDepartmentsUseCase;
    constructor(listDepartmentsUseCase: ListDepartmentUseCase);
    handle(query: PageQueryParamSchema, user: UserPayload, request: Request, response: Response): Promise<Response>;
}
