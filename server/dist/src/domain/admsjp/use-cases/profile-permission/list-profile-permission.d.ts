import { ProfilePermission } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { IListOptions } from '@/core/repositories/list-options';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
interface ListProfilePermissionUseCaseRequest {
    options: IListOptions;
    searchParams: ISearchParamDTO[];
}
type ListProfilePermissionUseCaseResponse = Either<null, {
    profilePermissions: ProfilePermission[];
}>;
export declare class ListProfilePermissionUseCase {
    private profilePermissionRepository;
    constructor(profilePermissionRepository: ProfilePermissionsRepository);
    execute({ options, searchParams, }: ListProfilePermissionUseCaseRequest): Promise<ListProfilePermissionUseCaseResponse>;
}
export {};
