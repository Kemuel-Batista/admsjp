import { GetUserPermissionUseCase } from '@/domain/admsjp/use-cases/user/get-user-permission';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class GetUserPermissionController {
    private getUserPermission;
    constructor(getUserPermission: GetUserPermissionUseCase);
    handle(user: UserPayload): Promise<{
        user: import("@/domain/admsjp/types/user/user-without-password").UserWithoutPassword;
    }>;
}
