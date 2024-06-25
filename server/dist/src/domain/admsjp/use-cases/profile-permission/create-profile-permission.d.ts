import { ProfilePermission } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
import { ProfilesRepository } from '../../repositories/profiles-repository';
interface CreateProfilePermissionUseCaseRequest {
    profileId: ProfilePermission['profileId'];
    key: ProfilePermission['key'];
    createdBy: ProfilePermission['createdBy'];
}
type CreateProfilePermissionUseCaseResponse = Either<ResourceNotFoundError, {
    profilePermission: ProfilePermission;
}>;
export declare class CreateProfilePermissionUseCase {
    private profilePermissionsRepository;
    private profilesRepository;
    constructor(profilePermissionsRepository: ProfilePermissionsRepository, profilesRepository: ProfilesRepository);
    execute({ key, profileId, createdBy, }: CreateProfilePermissionUseCaseRequest): Promise<CreateProfilePermissionUseCaseResponse>;
}
export {};
