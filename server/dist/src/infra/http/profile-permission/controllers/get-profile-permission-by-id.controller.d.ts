import { z } from 'zod';
import { GetProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/get-profile-permission-by-id';
declare const paramSchema: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
type ParamSchema = z.infer<typeof paramSchema>;
export declare class GetProfilePermissionByIdController {
    private getProfilePermissionById;
    constructor(getProfilePermissionById: GetProfilePermissionByIdUseCase);
    handle(id: ParamSchema): Promise<{
        profilePermission: {
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
        };
    }>;
}
export {};
