import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ProfilePermissionsRepository } from '../../../repositories/profile-permissions-repository'

@Injectable()
export class ListProfilePermissionUseCase {
  constructor(
    private profilePermissionRepository: ProfilePermissionsRepository,
  ) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ProfilePermission[]> {
    const profilePermissions = await this.profilePermissionRepository.list(
      options,
      searchParams,
    )

    return profilePermissions
  }
}
