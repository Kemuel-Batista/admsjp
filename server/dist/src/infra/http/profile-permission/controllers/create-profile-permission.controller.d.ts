import { Response } from 'express';
import { z } from 'zod';
import { CreateProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/create-profile-permission';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createProfilePermissionSchema: z.ZodObject<{
    key: z.ZodString;
    profileId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    key?: string;
    profileId?: number;
}, {
    key?: string;
    profileId?: number;
}>;
type CreateProfilePermissionSchema = z.infer<typeof createProfilePermissionSchema>;
export declare class CreateProfilePermissionController {
    private createProfilePermission;
    constructor(createProfilePermission: CreateProfilePermissionUseCase);
    handle(body: CreateProfilePermissionSchema, user: UserPayload, response: Response): Promise<Response>;
}
export {};
