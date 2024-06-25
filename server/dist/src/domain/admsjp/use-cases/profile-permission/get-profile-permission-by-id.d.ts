import { ProfilePermission } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
interface GetProfilePermissionByIdUseCaseRequest {
    id: ProfilePermission['id'];
}
type GetProfilePermissionByIdUseCaseResponse = Either<ResourceNotFoundError, {
    profilePermission: ProfilePermission;
}>;
export declare class GetProfilePermissionByIdUseCase {
    private profilePermissionsRepository;
    constructor(profilePermissionsRepository: ProfilePermissionsRepository);
    execute({ id, }: GetProfilePermissionByIdUseCaseRequest): Promise<GetProfilePermissionByIdUseCaseResponse>;
}
export {};
