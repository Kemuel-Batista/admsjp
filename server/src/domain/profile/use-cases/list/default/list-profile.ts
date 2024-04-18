import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListProfileDTO } from '@/domain/profile/dtos/list-profile.dto'
import { ProfileRepository } from '@/domain/profile/repositories/profile-repository'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { UserWithPermission } from '@/domain/user/modules/user-permission/types/user-with-permission'

@Injectable()
export class ListProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
    profileId: UserWithPermission['profileId'],
  ): Promise<ListProfileDTO> {
    if (profileId !== UserProfile.ADMINISTRADOR) {
      searchParams.push({
        condition: 'equals',
        field: 'visible',
        value: 1,
      })
    }

    const { profiles, count } = await this.profileRepository.list(
      options,
      searchParams,
    )

    return { profiles, count }
  }
}
