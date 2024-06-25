import { z } from 'zod';
import { DeleteProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/delete-profile-permission-by-id';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const deleteProfilePermissionSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof deleteProfilePermissionSchema>;
export declare class DeleteProfilePermissionByIdController {
    private deleteProfilePermissionById;
    constructor(deleteProfilePermissionById: DeleteProfilePermissionByIdUseCase);
    handle(id: ParamSchema, user: UserPayload): Promise<void>;
}
export {};
