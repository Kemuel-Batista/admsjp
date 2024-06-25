import { type ProfilePermission, type User } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
interface DeleteProfilePermissionByIdUseCaseRequest {
    id: ProfilePermission['id'];
    deletedBy: User['id'];
}
type DeleteProfilePermissionByIdUseCaseResponse = Either<ResourceNotFoundError, null>;
export declare class DeleteProfilePermissionByIdUseCase {
    private profilePermissionsRepository;
    constructor(profilePermissionsRepository: ProfilePermissionsRepository);
    execute({ id, }: DeleteProfilePermissionByIdUseCaseRequest): Promise<DeleteProfilePermissionByIdUseCaseResponse>;
}
export {};
