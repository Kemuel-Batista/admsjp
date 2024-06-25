import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListProfileDTO } from '@/domain/admsjp/dtos/profile';
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository';
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission';
export declare class ListProfileUseCase {
    private profilesRepository;
    constructor(profilesRepository: ProfilesRepository);
    execute(options: IListOptions, searchParams: ISearchParamDTO[], profileId: UserWithPermission['profileId']): Promise<ListProfileDTO>;
}
