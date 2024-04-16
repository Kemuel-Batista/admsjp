import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ProfilePermissionsRepository } from '../../../repositories/profile-permissions-repository'

@Injectable()
export class ListProfilePermissionByProfileIdUseCase {
  constructor(
    private profilePermissionRepository: ProfilePermissionsRepository,
  ) {}

  async execute(
    profileId: ProfilePermission['profileId'],
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ProfilePermission[]> {
    const profilePermissions =
      await this.profilePermissionRepository.listByProfileId(
        profileId,
        options,
        searchParams,
      )

    return profilePermissions
  }
}
