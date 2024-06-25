import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListProfileDTO } from '@/domain/admsjp/dtos/profile'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

@Injectable()
export class ListProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

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

    const { profiles, count } = await this.profilesRepository.list(
      options,
      searchParams,
    )

    return { profiles, count }
  }
}
