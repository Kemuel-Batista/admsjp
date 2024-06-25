import { User } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { UserWithoutPassword } from '@/domain/admsjp/types/user/user-without-password';
import { ProfilePermissionsRepository } from '../../repositories/profile-permissions-repository';
import { UsersRepository } from '../../repositories/users-repository';
interface GetUserPermissionUseCaseRequest {
    userId: User['id'];
}
type GetUserPermissionUseCaseResponse = Either<ResourceNotFoundError, {
    userWithPermission: UserWithoutPassword;
}>;
export declare class GetUserPermissionUseCase {
    private usersRepository;
    private profilePermissionsRepository;
    constructor(usersRepository: UsersRepository, profilePermissionsRepository: ProfilePermissionsRepository);
    execute({ userId, }: GetUserPermissionUseCaseRequest): Promise<GetUserPermissionUseCaseResponse>;
}
export {};
