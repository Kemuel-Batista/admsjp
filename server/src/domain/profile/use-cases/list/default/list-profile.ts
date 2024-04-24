import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { UserProfile } from '@/domain/admsjp/enums/user/user-profile'
import { ListProfileDTO } from '@/domain/profile/dtos/list-profile.dto'
import { ProfileRepository } from '@/domain/profile/repositories/profile-repository'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

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
