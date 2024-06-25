import { Request } from 'express';
import { ParamsSchema } from '@/core/schemas/params-schema';
import { PageQueryParamSchema } from '@/core/schemas/query-params-schema';
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission-by-profile-id';
declare class ListProfilePermissionByProfileIdController {
    private listProfilePermissionByProfileId;
    constructor(listProfilePermissionByProfileId: ListProfilePermissionByProfileIdUseCase);
    handle(query: PageQueryParamSchema, profileId: ParamsSchema, request: Request): Promise<{
        profilePermissions: {
            id: number;
            uuid: string;
            profileId: number;
            key: string;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
            deletedAt: Date;
            deletedBy: number;
        }[];
    }>;
}
export { ListProfilePermissionByProfileIdController };
