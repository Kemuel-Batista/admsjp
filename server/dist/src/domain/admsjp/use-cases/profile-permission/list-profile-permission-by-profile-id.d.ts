import { ProfilePermission } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { IListOptions } from '@/core/repositories/list-options';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
import { ProfilesRepository } from '../../repositories/profiles-repository';
interface ListProfilePermissionByProfileIdUseCaseRequest {
    profileId: ProfilePermission['profileId'];
    options: IListOptions;
    searchParams: ISearchParamDTO[];
}
type ListProfilePermissionByProfileIdUseCaseResponse = Either<ResourceNotFoundError, {
    profilePermissions: ProfilePermission[];
}>;
export declare class ListProfilePermissionByProfileIdUseCase {
    private profilePermissionsRepository;
    private profilesRepository;
    constructor(profilePermissionsRepository: ProfilePermissionsRepository, profilesRepository: ProfilesRepository);
    execute({ profileId, options, searchParams, }: ListProfilePermissionByProfileIdUseCaseRequest): Promise<ListProfilePermissionByProfileIdUseCaseResponse>;
}
export {};
