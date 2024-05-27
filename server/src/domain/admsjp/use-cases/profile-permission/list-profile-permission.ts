import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { Either, success } from '@/core/either'
import { IListOptions } from '@/core/repositories/list-options'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

interface ListProfilePermissionUseCaseRequest {
  options: IListOptions
  searchParams: ISearchParamDTO[]
}

type ListProfilePermissionUseCaseResponse = Either<
  null,
  {
    profilePermissions: ProfilePermission[]
  }
>

@Injectable()
export class ListProfilePermissionUseCase {
  constructor(
    private profilePermissionRepository: ProfilePermissionsRepository,
  ) {}

  async execute({
    options = {},
    searchParams = [],
  }: ListProfilePermissionUseCaseRequest): Promise<ListProfilePermissionUseCaseResponse> {
    const profilePermissions = await this.profilePermissionRepository.list(
      options,
      searchParams,
    )

    return success({
      profilePermissions,
    })
  }
}
