import { type Request, type Response } from 'express';
import { PageQueryParamSchema } from '@/core/schemas/query-params-schema';
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list/default/list-profile';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ListProfileController {
    private listProfileUseCase;
    constructor(listProfileUseCase: ListProfileUseCase);
    handle(query: PageQueryParamSchema, user: UserPayload, request: Request, response: Response): Promise<Response>;
}
