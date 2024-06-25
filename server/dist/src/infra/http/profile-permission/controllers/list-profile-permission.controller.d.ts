import { Request } from 'express';
import { PageQueryParamSchema } from '@/core/schemas/query-params-schema';
import { ListProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission';
export declare class ListProfilePermissionController {
    private listProfilePermission;
    constructor(listProfilePermission: ListProfilePermissionUseCase);
    handle(query: PageQueryParamSchema, request: Request): Promise<{
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
